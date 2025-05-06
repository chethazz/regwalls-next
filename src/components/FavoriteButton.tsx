"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { FavoriteInfo } from "@/app/lib/types";
import kyInstance from "@/lib/ky";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import LoginOrCreate from "./LoginOrCreate";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface FavoriteButtonProps {
    wallpaperId: string;
    initialState: FavoriteInfo;
    className?: string;
    size?: number;
}

export default function FavoriteButton({
    wallpaperId,
    initialState,
    className,
    size = 24
}: FavoriteButtonProps) {

    const { user } = useSession();

    const { data } = useQuery({
        queryKey: ["favorite-info", wallpaperId],
        queryFn: () => kyInstance.get(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`).json<FavoriteInfo>(),
        initialData: initialState,
        staleTime: Infinity,
        enabled: !!user
    });

    if (!user) {
        return (
            <div className={className}>
                <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                        <Heart
                            className="transition-all hover:scale-110 hover:animate-pulse hover:fill-red-400 hover:text-red-400"
                            size={size}
                        />
                    </DropdownMenuTrigger>
                    <LoginOrCreate />
                </DropdownMenu>
            </div>
        );
    }

    function onFavoriteClick() {
        if (data.isFavoritedByUser) {
            kyInstance.delete(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`);
        } else {
            kyInstance.post(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`);
        }
    }

    return (
        <button className={cn(
            "cursor-pointer",
            className
        )}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onFavoriteClick();
            }}
        >
            <Heart className={cn("transition-all hover:scale-110 hover:animate-pulse hover:fill-red-400 hover:text-red-400",
                data.isFavoritedByUser && "fill-red-600 text-red-600"
            )}
                size={size}
            />
        </button>
    );
}