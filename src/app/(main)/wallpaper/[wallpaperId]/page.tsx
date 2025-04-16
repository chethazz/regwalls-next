import { wallpaperDataInclude } from "@/app/lib/types";
import prisma from "@/lib/prisma";
import Image from "next/image";
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
            <div className="flex w-full py-5 max-w-7xl">
                <div className="basis-3/5">
                    <Image
                        src={imageUrl}
                        alt={wallpaper.title}
                        width={500}
                        height={600}
                        className="rounded-2xl"
                    />
                </div>
                <div className="basis-2/5">

                </div>
            </div>
        </main>
    );
}