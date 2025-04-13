"use client";

import { WallpaperCard } from "@/components/WallpaperCard";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { WallpapersPage } from "../lib/types";

export default function Wallpapers() {

    const {
        data,
        status,
        isFetching,
        error
    } = useQuery({
        queryKey: ["wallpapers"],
        queryFn: kyInstance.get("http://localhost:3000/api/wallpapers").json<WallpapersPage>
    });

    if (!data) return null;

    return (
        <div className="w-full max-w-7xl py-5">
            <div className="flex flex-col grid-cols-2 gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4">
                {data.wallpapers.map(wallpaper => (
                    <WallpaperCard
                        key={wallpaper.id}
                        wallpaper={wallpaper}
                    />
                ))}
            </div>
        </div>
    );
}