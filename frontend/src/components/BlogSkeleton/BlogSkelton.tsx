import { Skeleton } from "@/components/ui/skeleton";


export function BlogSkeleton() {
    return (
        <div className="w-full">
            <div className="bg-gray-50 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-4 sm:p-6 border space-y-4">
                {/* Image */}
                <Skeleton className="h-40  w-full rounded-xl" />
                {/* Title */}
                <Skeleton className="h-6 w-3/4 rounded-md" />

                {/* Description */}
                <Skeleton className="h-4 w-full rounded-md" />
            </div>
        </div>
    );
}
