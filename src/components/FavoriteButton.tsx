"use client";

import { FavoriteInfo } from "@/app/lib/types";
import kyInstance from "@/lib/ky";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
    wallpaperId: string;
    initialState: FavoriteInfo;
    className?: string;
}

export default function FavoriteButton({
    wallpaperId,
    initialState,
    className
}: FavoriteButtonProps) {

    const { data } = useQuery({
        queryKey: ["favorite-info", wallpaperId],
        queryFn: () => kyInstance.get(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`).json<FavoriteInfo>(),
        initialData: initialState,
        staleTime: Infinity
    });

    function onFavoriteClick() {
        if (data.isFavoritedByUser) {
            kyInstance.delete(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`);
        } else {
            kyInstance.post(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`);
        }
    }

    return (
        <button className={cn(
            "cursor-pointer transition-transform hover:scale-110 hover:animate-pulse",
            className
        )}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onFavoriteClick();
            }}
        >
            <Heart className={cn(
                data.isFavoritedByUser && "fill-red-600 text-red-600 hover:fill-red-400 hover:text-red-400"
            )}
            />
        </button>
    );
}