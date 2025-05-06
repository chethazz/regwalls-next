import { getUserWallpaperDataInclude, wallpaperDataInclude, WallpapersPage } from "@/app/lib/types";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string; }>; }
) {
    try {
        const { userId } = await params;

        if (!userId) throw new Error("User Id is required");

        const { user: loggedInUser } = await validateRequest();

        if (loggedInUser) {
            const favorites = await prisma.favorite.findMany({
                where: { userId },
                include: {
                    wallpaper: {
                        include: getUserWallpaperDataInclude(loggedInUser.id)
                    }
                }
            });

            const data: WallpapersPage = {
                wallpapers: favorites.map(fav => fav.wallpaper)
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
        });

        const data: WallpapersPage = {
            wallpapers: favorites.map(fav => fav.wallpaper)
        };

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}