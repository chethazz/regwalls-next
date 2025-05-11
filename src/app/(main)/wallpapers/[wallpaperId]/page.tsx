import { getUserWallpaperDataInclude, UserWallpaperData, WallpaperData, wallpaperDataInclude } from "@/app/lib/types";
import { validateRequest } from "@/auth";
import FavoriteButton from "@/components/FavoriteButton";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/UserButton";
import { WallpaperCard } from "@/components/WallpaperCard";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
    params: Promise<{ wallpaperId: string; }>;
}

const getWallpaper = cache(async (wallpaperId: string) => {
    const { user: loggedInUser } = await validateRequest();

    if (loggedInUser) {
        const wallpaper = await prisma.wallpaper.findUnique({
            where: {
                id: wallpaperId
            },
            include: getUserWallpaperDataInclude(loggedInUser.id)
        });

        if (!wallpaper) notFound();

        return wallpaper;
    }

    const wallpaper = await prisma.wallpaper.findUnique({
        where: {
            id: wallpaperId
        },
        include: wallpaperDataInclude
    });

    if (!wallpaper) notFound();

    return wallpaper;
});

export async function generateMetadata({ params }: PageProps) {
    const { wallpaperId } = await params;

    const wallpaper = await getWallpaper(wallpaperId);

    return {
        title: `${wallpaper.user.displayName}: ${wallpaper.title.slice(0, 20)}...`,
    };
}

export default async function Page({
    params
}: PageProps) {
    const { wallpaperId } = await params;

    const wallpaper = await getWallpaper(wallpaperId);

    const imageUrl = wallpaper.image?.imageUrl;

    if (!imageUrl) {
        return (
            <p className="text-center text-destructive">
                An error occurred while loading the wallpaper. Please try again
            </p>
        );
    }

    function isUserWallpaperData(wallpaper: WallpaperData | UserWallpaperData): wallpaper is UserWallpaperData {
        return 'favorites' in wallpaper;
    }

    return (
        <main className="flex items-center justify-center p-5">
            <div className="block w-full gap-4 space-y-5 sm:flex max-w-7xl">
                <div className="p-4 space-y-3 h-fit basis-5/7 bg-secondary rounded-2xl">
                    <h1 className="text-4xl font-bold">{wallpaper.title}</h1>
                    <Image
                        src={imageUrl}
                        alt={wallpaper.title}
                        width={1500}
                        height={1500}
                        className="rounded-2xl"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">Description</h2>
                        <p className="text-muted-foreground">{wallpaper.description}</p>
                    </div>
                    <h2 className="text-lg font-semibold">Creator:</h2>
                    <div className="flex flex-col justify-between w-full gap-4 md:flex-row">
                        <div className="md:w-1/2">

                            <Link
                                className="flex gap-4 p-3 overflow-x-hidden bg-background rounded-2xl"
                                href={`/users/${wallpaper.user.username}`}
                                title="Open profile"
                            >
                                <UserButton size={50} />
                                <div>
                                    <p className="font-semibold">{wallpaper.user.displayName}</p>
                                    <p className="text-muted-foreground">@{wallpaper.user.username}</p>
                                </div>
                            </Link>
                        </div>
                        <FavoriteButton
                            wallpaperId={wallpaperId}
                            initialState={{
                                isFavoritedByUser: isUserWallpaperData(wallpaper)
                                    ? wallpaper.favorites.some(
                                        favorite => favorite.userId === wallpaper.user.id
                                    )
                                    : false
                            }}
                            className="w-full p-5 md:w-1/2 bg-card rounded-2xl"
                            size={32}
                            showLabel
                        />
                    </div>
                    <Button className="w-full cursor-pointer" asChild>
                        <a href={`/api/download/${wallpaperId}`}>
                            Download
                        </a>
                    </Button>
                </div>
                <div className="p-4 basis-2/7 bg-secondary rounded-2xl">
                    <SuggestedWallpapers />
                </div>
            </div>
        </main>
    );
}

const getSuggestedWallpapers = unstable_cache(
    async () => {

        const { user: loggedInUser } = await validateRequest();

        if (loggedInUser) {
            const result = await prisma.wallpaper.findMany({
                include: getUserWallpaperDataInclude(loggedInUser.id),
                take: 5,
                orderBy: { createdAt: "desc" }
            });

            return result;
        }

        const result = await prisma.wallpaper.findMany({
            include: wallpaperDataInclude,
            take: 5
        });

        return result;
    }
);


async function SuggestedWallpapers() {

    const suggestedWalls = await getSuggestedWallpapers();

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Suggested wallpapers</h1>
            {suggestedWalls.map(wallpaper => (
                <WallpaperCard
                    key={wallpaper.id}
                    wallpaper={wallpaper}
                />
            ))}
        </div>
    );
}