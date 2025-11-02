// components/property/PropertyCard.tsx
import Link from 'next/link';
import { PropertyProps } from '@/interfaces';

interface PropertyCardProps {
  property: PropertyProps;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const {
    id,
    name,
    description,
    address,
    rating,
    category,
    price,
    offers,
    image,
    discount
  } = property;

  const discountedPrice = discount ? price * (1 - parseInt(discount) / 100) : price;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image with Discount Badge */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discount}% OFF
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-sm flex items-center">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{name}</h3>
        
        <p className="text-gray-600 mb-2 flex items-center">
          <span className="text-gray-400 mr-2">📍</span>
          {address.city}, {address.state}, {address.country}
        </p>

        <p className="text-gray-500 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {category.map((cat, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            🛏️ {offers.bed} bed{offers.bed !== '1' ? 's' : ''}
          </span>
          <span className="flex items-center">
            🚿 {offers.shower} shower{offers.shower !== '1' ? 's' : ''}
          </span>
          <span className="flex items-center">
            👥 {offers.occupants}
          </span>
        </div>
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            {discount && (
              <span className="text-lg text-red-500 font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
            )}
            <span className={`text-lg font-bold ${discount ? 'text-gray-400 line-through' : 'text-blue-600'}`}>
              ${price}
            </span>
            <span className="text-gray-500 text-sm">/ night</span>
          </div>
          
          <Link 
            href={`/properties/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
