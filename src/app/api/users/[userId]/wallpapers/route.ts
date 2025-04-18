import { wallpaperDataInclude, WallpapersPage } from "@/app/lib/types";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string; }>; }
) {
    try {
        const { userId } = await params;

        if (!userId) {
            throw new Error("User Id is required");
        }

        const wallpapers = await prisma.wallpaper.findMany({
            where: { userId },
            include: wallpaperDataInclude,
            orderBy: { createdAt: "desc" },
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