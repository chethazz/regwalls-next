"use client";

import { WallpapersPage } from "@/app/lib/types";
import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { WallpaperCard } from "@/components/WallpaperCard";
import kyInstance from "@/lib/ky";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import WallpapersLoadingSkeleton from "./WallpapersLoadingSkeleton";

export default function Wallpapers() {

    const {
        data,
        isFetching,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ["wallpapers", "main-wallpapers"],
        queryFn: ({ pageParam }) => kyInstance.get(
            "http://localhost:3000/api/wallpapers",
            pageParam ? { searchParams: { cursor: pageParam } } : {}
        ).json<WallpapersPage>(),
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.nextCursor
    });

    const wallpapers = data?.pages.flatMap(page => page.wallpapers) || [];

    if (status === "pending") {
        return <WallpapersLoadingSkeleton />;
    }

    if (status === "error") {
        return <p className="text-center text-destructive">
            An error occcurred while loading wallpapers. Please try again.
        </p>;
    }

    return (
        <InfiniteScrollContainer
            onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
            className="w-full max-w-7xl"
        >
            <div className="flex flex-col grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {wallpapers.map(wallpaper => (
                    <WallpaperCard
                        key={wallpaper.id}
                        wallpaper={wallpaper}
                    />
                ))}
            </div>
            {isFetchingNextPage && <LoaderCircle className="mx-auto my-3 animate-spin" />}
        </InfiniteScrollContainer>
    );
}