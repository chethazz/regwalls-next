import { Skeleton } from "@/components/ui/skeleton";

export default function WallpapersLoadingSkeleton() {
    return (
        <div className="w-full py-5 max-w-7xl">
            <div className="flex flex-col grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-80 bg-secondary" />
                ))}
            </div>
        </div>
    );
}