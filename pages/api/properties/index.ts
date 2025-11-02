// pages/api/properties/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PropertyProps } from '@/types/property';

// Mock data - replace with your database
const mockProperties: PropertyProps[] = [
  {
    id: '1',
    name: 'Luxury Beach Villa',
    description: 'Beautiful beachfront villa with stunning ocean views and modern amenities.',
    address: {
      state: 'California',
      city: 'Malibu',
      country: 'USA'
    },
    rating: 4.8,
    category: ['Beach', 'Luxury', 'Villa'],
    price: 450,
    offers: {
      bed: '2',
      shower: '2',
      occupants: '4'
    },
    image: '/images/beach-villa.jpg',
    discount: '10'
  },
  {
    id: '2',
    name: 'Downtown Modern Apartment',
    description: 'Stylish apartment in the heart of the city with easy access to attractions.',
    address: {
      state: 'New York',
      city: 'Manhattan',
      country: 'USA'
    },
    rating: 4.5,
    category: ['Apartment', 'City', 'Modern'],
    price: 200,
    offers: {
      bed: '1',
      shower: '1',
      occupants: '2'
    },
    image: '/images/downtown-apartment.jpg',
    discount: '5'
  },
  {
    id: '3',
    name: 'Mountain Cabin Retreat',
    description: 'Cozy cabin nestled in the mountains perfect for nature lovers.',
    address: {
      state: 'Colorado',
      city: 'Aspen',
      country: 'USA'
    },
    rating: 4.7,
    category: ['Cabin', 'Mountain', 'Nature'],
    price: 180,
    offers: {
      bed: '3',
      shower: '2',
      occupants: '6'
    },
    image: '/images/mountain-cabin.jpg',
    discount: '15'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  switch (method) {
    case 'GET':
      try {
        // Optional filtering by category
        const category = query.category as string;
        let filteredProperties = mockProperties;

        if (category) {
          filteredProperties = mockProperties.filter(property =>
            property.category.some(cat => 
              cat.toLowerCase().includes(category.toLowerCase())
            )
          );
        }

        // Optional sorting by price or rating
        const sortBy = query.sortBy as string;
        if (sortBy === 'price') {
          filteredProperties.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'rating') {
          filteredProperties.sort((a, b) => b.rating - a.rating);
        }

        res.status(200).json(filteredProperties);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
