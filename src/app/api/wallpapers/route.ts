import { wallpaperDataInclude, WallpapersPage } from "@/app/lib/types";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const wallpapers = await prisma.wallpaper.findMany({
            include: wallpaperDataInclude
        });

        const data: WallpapersPage = {
            wallpapers
        };

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "An internal server error" }, { status: 500 });
    }
}