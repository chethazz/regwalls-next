"use client"

import { useSession } from "@/app/(main)/SessionProvider";
import { UserWallpaperData, WallpaperData } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import WallpaperCardMoreButton from "./WallpaperCardMoreButton";

interface WallpaperCardProps {
    wallpaper: WallpaperData | UserWallpaperData;
}

export function WallpaperCard({
    wallpaper,
}: WallpaperCardProps) {

    const { user: loggedInUser } = useSession();

    if (!wallpaper.image) return null;

    function isUserWallpaperData(wallpaper: WallpaperData | UserWallpaperData): wallpaper is UserWallpaperData {
        return 'favorites' in wallpaper;
    }

    return (
        <Link
            href={`/wallpapers/${wallpaper.id}`}
        >
            <Card className="h-full gap-4 pt-0 pb-4 overflow-hidden">
                <CardContent className="relative h-64 overflow-hidden">
                    <Image
                        src={wallpaper.image.imageUrl}
                        alt={wallpaper.title}
                        fill
                        className="object-cover"
                    />
                    {loggedInUser && wallpaper.userId === loggedInUser.id && (
                        <WallpaperCardMoreButton
                            wallpaper={wallpaper}
                            className="absolute top-3 right-3"
                        />
                    )}
                    <FavoriteButton
                        wallpaperId={wallpaper.id}
                        initialState={{
                            isFavoritedByUser: isUserWallpaperData(wallpaper)
                                ? wallpaper.favorites.some(
                                    favorite => favorite.userId === wallpaper.user.id
                                )
                                : false
                        }}
                        className="absolute bottom-3 right-3"
                    />
                </CardContent>
                <CardHeader className="px-4">
                    <CardTitle>{wallpaper.title}</CardTitle>
                    {wallpaper.description && (
                        <CardDescription
                            dangerouslySetInnerHTML={{ __html: wallpaper.description }}
                            className="line-clamp-2"
                        />
                    )}
                </CardHeader>
            </Card>
        </Link>
    );
}