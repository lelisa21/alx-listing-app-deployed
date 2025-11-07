
import PropertyCard from "@/components/property/PropertyCard";
import { PropertyProps } from "@/interfaces"; 
import { PROPERTYLISTINGSAMPLE } from "@/constants";

const Home = () => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-6">
      {PROPERTYLISTINGSAMPLE.map((property) => (
        <PropertyCard key={property.name} property={property} />
      ))}
    </div>
  );
};

export default Home;
