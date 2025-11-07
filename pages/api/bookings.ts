import { NextApiRequest, NextApiResponse } from 'next';

interface Booking {
  id: string;
  userId?: string;
  createdAt: string;
  status: string;
  [key: string]: unknown;
}

const bookings: Booking[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Get bookings (in real app, I will filter by user)
    const { userId } = req.query;
    
    const userBookings = userId 
      ? bookings.filter(booking => booking.userId === userId)
      : bookings;
    
    res.status(200).json({
      success: true,
      data: userBookings
    });
    
  } else if (req.method === 'POST') {
    try {
      const newBooking = {
        id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };
      
      bookings.push(newBooking);
      
      res.status(201).json({
        success: true,
        data: newBooking,
        message: 'Booking created successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating booking',
        error
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
