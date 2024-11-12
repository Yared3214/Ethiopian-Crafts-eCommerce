import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"


const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className='overflow-hidden rounded-md'>
        <Skeleton className="bg-gray-300 w-full h-48 object-cover rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4  bg-gray-300 w-[250px]" />
        <Skeleton className="h-4  bg-gray-300 w-[200px]" />
      </div>
    </div>
  );
}

export default ProductSkeleton;