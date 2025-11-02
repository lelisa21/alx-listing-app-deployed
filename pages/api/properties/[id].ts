// pages/api/properties/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PropertyProps } from '@/types/property';

const mockProperties: PropertyProps[] = [
  // Same properties as above
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case 'GET':
      try {
        const property = mockProperties.find(p => p.id === id);
        
        if (!property) {
          return res.status(404).json({ error: 'Property not found' });
        }

        res.status(200).json(property);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch property' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
