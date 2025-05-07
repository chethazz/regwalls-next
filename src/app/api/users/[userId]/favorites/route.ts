import { getUserWallpaperDataInclude, wallpaperDataInclude, WallpapersPage } from "@/app/lib/types";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string; }>; }
) {
    try {
        const cursor = req.nextUrl.searchParams.get("cursor");

        const pageSize = 6;

        const { userId } = await params;

        if (!userId) throw new Error("User Id is required");

        const { user: loggedInUser } = await validateRequest();

        if (loggedInUser) {
            const favorites = await prisma.favorite.findMany({
                where: { userId },
                include: {
                    wallpaper: {
                        include: getUserWallpaperDataInclude(loggedInUser.id),
                    }
                },
                orderBy: { createdAt: "desc" },
                take: pageSize + 1,
                cursor: cursor ? { id: cursor } : undefined
            });

            const nextCursor = favorites.length > pageSize ? favorites[pageSize].id : null;

            const data: WallpapersPage = {
                wallpapers: favorites.slice(0, pageSize).map(fav => fav.wallpaper),
                nextCursor
            };

            return Response.json(data);
        }

        const favorites = await prisma.favorite.findMany({
            where: { userId },
            include: {
                wallpaper: {
                    include: wallpaperDataInclude
                }
            },
            orderBy: { createdAt: "desc" },
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined
        });

        const nextCursor = favorites.length > pageSize ? favorites[pageSize].id : null;

        const data: WallpapersPage = {
            wallpapers: favorites.slice(0, pageSize).map(fav => fav.wallpaper),
            nextCursor
        };

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}