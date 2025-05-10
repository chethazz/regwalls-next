import { Skeleton } from "@/components/ui/skeleton";

export default function WallpapersLoadingSkeleton() {
    return (
        <div className="w-full max-w-7xl">
            <div className="flex flex-col grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="flex items-end h-[22rem] bg-secondary">
                        <Skeleton className="w-full p-4 space-y-3 h-fit">
                            <Skeleton className="bg-gray-300 rounded-[5px] h-5 w-[40%]" />
                            <Skeleton className="bg-gray-300 rounded-[5px] h-4 w-full" />
                            <Skeleton className="bg-gray-300 rounded-[5px] h-4 w-full" />
                        </Skeleton>
                    </Skeleton>
                ))}
            </div>
        </div>
    );
}