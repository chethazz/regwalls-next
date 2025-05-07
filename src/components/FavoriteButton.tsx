"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { FavoriteInfo } from "@/app/lib/types";
import kyInstance from "@/lib/ky";
import { cn } from "@/lib/utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import LoginOrCreate from "./LoginOrCreate";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { toast } from "sonner";

interface FavoriteButtonProps {
    wallpaperId: string;
    initialState: FavoriteInfo;
    className?: string;
    size?: number;
    children?: React.ReactNode;
}

export default function FavoriteButton({
    wallpaperId,
    initialState,
    className,
    size = 24,
    children
}: FavoriteButtonProps) {

    const { user } = useSession();

    const queryClient = useQueryClient();

    const queryKey: QueryKey = ["bookmark-info", wallpaperId];

    const { data } = useQuery({
        queryKey: queryKey,
        queryFn: () => kyInstance.get(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`).json<FavoriteInfo>(),
        initialData: initialState,
        staleTime: Infinity,
        enabled: !!user
    });

    const { mutate } = useMutation({
        mutationFn: () =>
            data.isFavoritedByUser
                ? kyInstance.delete(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`)
                : kyInstance.post(`http://localhost:3000/api/wallpapers/${wallpaperId}/favorite`),
        onMutate: async () => {
            toast.message(`${data.isFavoritedByUser ? "Removed from favorites" : "Added to favorites"}`);

            await queryClient.cancelQueries({ queryKey });

            const previousState = queryClient.getQueryData<FavoriteInfo>(queryKey);

            queryClient.setQueryData<FavoriteInfo>(queryKey, () => ({
                isFavoritedByUser: !previousState?.isFavoritedByUser
            }));

            return { previousState };
        },
        onError(error, variables, context) {
            queryClient.setQueryData(queryKey, () => context?.previousState);
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        },
    });

    if (!user) {
        return (
            <div className={className}>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center justify-center gap-2 cursor-pointer">
                        <Heart
                            className="transition-all hover:scale-110 hover:animate-pulse hover:fill-red-400 hover:text-red-400 group-hover:scale-110 group-hover:animate-pulse group-hover:fill-red-400 group-hover:text-red-400"
                            size={size}
                        />
                        {children}
                    </DropdownMenuTrigger>
                    <LoginOrCreate />
                </DropdownMenu>
            </div>
        );
    }

    return (
        <button className={cn(
            "cursor-pointer flex justify-center items-center gap-2 group",
            className
        )}
            onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                mutate();
            }}
        >
            <Heart className={cn("transition-all hover:scale-110 hover:animate-pulse hover:fill-red-400 hover:text-red-400 group-hover:scale-110 group-hover:animate-pulse group-hover:fill-red-400 group-hover:text-red-400",
                data.isFavoritedByUser && "fill-red-600 text-red-600"
            )}
                size={size}
            />
            {children}
        </button>
    );
}