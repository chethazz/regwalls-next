import { wallpaperDataInclude } from "@/app/lib/types";
import { WallpaperCard } from "@/components/WallpaperCard";
import prisma from "@/lib/prisma";
import { UserRound } from "lucide-react";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
    params: Promise<{ wallpaperId: string; }>;
}

const getWallpaper = cache(async (wallpaperId: string) => {
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

    return (
        <main className="flex items-center justify-center">
            <div className="block w-full gap-4 py-5 sm:flex max-w-7xl">
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
                    <div>
                        <h2 className="text-lg font-semibold">Creator:</h2>
                        <Link
                            className="flex w-1/2 gap-4 p-3 overflow-x-hidden bg-background rounded-2xl"
                            href={`/user/${wallpaper.user.username}`}
                            title="Open profile"
                        >
                            <UserRound size={50} />
                            <div>
                                <p className="font-semibold">{wallpaper.user.displayName}</p>
                                <p className="text-muted-foreground">@{wallpaper.user.username}</p>
                            </div>
                        </Link>
                    </div>
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