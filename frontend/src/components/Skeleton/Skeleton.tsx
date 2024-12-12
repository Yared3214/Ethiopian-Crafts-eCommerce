import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
    return (
        <div className="w-full">
            <div className="bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 sm:p-6 border space-y-4">
                {/* Title */}
                <Skeleton className="h-6 w-3/4 rounded-md" />

                {/* Description */}
                <Skeleton className="h-4 w-full rounded-md" />

                {/* Image */}
                <Skeleton className="h-48 sm:h-60 w-full rounded-xl" />

                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-24 rounded-md" />
                </div>

                {/* Price */}
                <Skeleton className="h-4 w-1/3 rounded-md mt-4" />
            </div>
        </div>
    );
}
