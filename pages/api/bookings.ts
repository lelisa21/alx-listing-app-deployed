// pages/api/bookings.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { InputProps } from '@/interfaces';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'POST':
      try {
        const InputProps: InputProps = body;
        if (!InputProps.propertyId || !InputProps.checkIn || !InputProps.checkOut || !InputProps.guests) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        if (!InputProps.customer?.name || !InputProps.customer?.email) {
          return res.status(400).json({ error: 'Missing customer information' });
        }

        console.log('Booking received:', InputProps);

        const bookingConfirmation = {
          id: `BKG-${Date.now()}`,
          ...InputProps,
          status: 'confirmed',
          totalAmount: calculateTotalAmount(InputProps), 
          createdAt: new Date().toISOString()
        };

        res.status(201).json({
          success: true,
          message: 'Booking confirmed successfully',
          booking: bookingConfirmation
        });
      } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ error: 'Failed to process booking' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function calculateTotalAmount(InputProps: InputProps): number {
  const nights = Math.ceil((new Date(InputProps.checkOut).getTime() - new Date(InputProps.checkIn).getTime()) / (1000 * 60 * 60 * 24));
  const basePrice = 200; 
  return nights * basePrice;
}
