import { wallpaperDataInclude } from "@/app/lib/types";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ wallpaperId: string; }>; }
) {
    try {

        const { wallpaperId } = await params;

        const wallpaper = await prisma.wallpaper.findUnique({
            where: {
                id: wallpaperId
            },
            include: wallpaperDataInclude
        });

        if (!wallpaper || !wallpaper.image?.imageUrl) {
            return Response.json({ error: "Wallpaper not found" }, { status: 404 });
        }

        const fileResponse = await fetch(wallpaper.image.imageUrl, {
            headers: {
                Authorization: `Bearer ${process.env.UPLOADTHING_TOKEN}`
            }
        });

        const fileBlob = await fileResponse.blob();

        return new NextResponse(fileBlob, {
            status: 200,
            headers: {
                "Content-Type": fileBlob.type,
                "Content-Disposition": `attachment; filename=${wallpaper.title}.jpg`
            }
        });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "An internal server error" }, { status: 500 });
    }
}