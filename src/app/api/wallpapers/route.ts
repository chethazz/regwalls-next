import { getUserWallpaperDataInclude, wallpaperDataInclude, WallpapersPage } from "@/app/lib/types";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const cursor = req.nextUrl.searchParams.get("cursor") || null;

        const pageSize = 6;

        const { user } = await validateRequest();

        if (user) {
            const wallpapers = await prisma.wallpaper.findMany({
                include: getUserWallpaperDataInclude(user.id),
                orderBy: { createdAt: "desc" },
                take: pageSize + 1,
                cursor: cursor ? { id: cursor } : undefined
            });

            const nextCursor = wallpapers.length > pageSize ? wallpapers[pageSize].id : null;

            const data: WallpapersPage = {
                wallpapers: wallpapers.slice(0, pageSize),
                nextCursor
            };

            return Response.json(data);
        }

        const wallpapers = await prisma.wallpaper.findMany({
            include: wallpaperDataInclude,
            orderBy: { createdAt: "desc" },
            take: pageSize + 1,
            cursor: cursor ? { id: cursor } : undefined
        });

        const nextCursor = wallpapers.length > pageSize ? wallpapers[pageSize].id : null;

        const data: WallpapersPage = {
            wallpapers: wallpapers.slice(0, pageSize),
            nextCursor
        };

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "An internal server error" }, { status: 500 });
    }
}