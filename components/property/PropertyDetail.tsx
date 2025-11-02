import React from 'react'

type PropertyDetailProps = {
  property: string
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div>{property}</div>
  )
}

export default PropertyDetail
