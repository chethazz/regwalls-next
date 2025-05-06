"use client";

import { WallpapersPage } from "@/app/lib/types";
import { WallpaperCard } from "@/components/WallpaperCard";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import WallpapersLoadingSkeleton from "../../WallpapersLoadingSkeleton";

interface FavoritesProps {
    userId: string;
}

export default function Favorites({
    userId
}: FavoritesProps) {
    const {
        data,
        isFetching,
        isError
    } = useQuery({
        queryKey: ["favorites"],
        queryFn: kyInstance.get(`http://localhost:3000/api/users/${userId}/favorites`).json<WallpapersPage>,
    });

    if (isFetching) {
        return <WallpapersLoadingSkeleton />;
    }

    if (isError) {
        return <p
            className="text-center text-destructive"
        >
            An error occcurred while loading favorites. Please try again
        </p>;
    }

    return (
        <div className="w-full gap-4 max-w-7xl">
            <div className="flex flex-col grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {
                    data?.wallpapers.map(wallpaper => (
                        <WallpaperCard
                            key={wallpaper.id}
                            wallpaper={wallpaper}
                        />
                    ))
                }
            </div>
        </div>
    );
}