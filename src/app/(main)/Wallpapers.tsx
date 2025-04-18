"use client";

import { WallpaperCard } from "@/components/WallpaperCard";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { WallpapersPage } from "../lib/types";
import WallpapersLoadingSkeleton from "./WallpapersLoadingSkeleton";

export default function Wallpapers() {

    const {
        data,
        isFetching,
        isError
    } = useQuery({
        queryKey: ["wallpapers"],
        queryFn: kyInstance.get("http://localhost:3000/api/wallpapers").json<WallpapersPage>,
    });

    if (isFetching) {
        return <WallpapersLoadingSkeleton />;
    }

    if (isError) {
        return <p
            className="text-center text-destructive"
        >An error occcurred while loading wallpapers. Please try again</p>;
    }

    return (
        <div className="w-full py-5 max-w-7xl">
            <div className="flex flex-col grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {data?.wallpapers.map(wallpaper => (
                    <WallpaperCard
                        key={wallpaper.id}
                        wallpaper={wallpaper}
                    />
                ))}
            </div>
        </div>
    );
}