"use server";

import { wallpaperDataInclude } from "@/app/lib/types";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function deleteWallpaper(id: string) {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    const wallpaper = await prisma.wallpaper.findUnique({
        where: { id }
    });

    if (!wallpaper) throw new Error("Wallpaper not found");

    if (wallpaper.userId !== user.id) throw new Error("Unauthorized");

    const deletedPost = await prisma.wallpaper.delete({
        where: { id },
        include: wallpaperDataInclude
    });

    return deletedPost;
}