import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export async function GET(req: Request) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return Response.json({ error: "Invalid authrization header" }, { status: 401 });
        }

        const unusedMedia = await prisma.image.findMany({
            where: {
                wallpaperId: null,
                ...(process.env.NODE_ENV === "production")
                    ? {
                        createdAt: {
                            lte: new Date(Date.now() - 1000 * 60 * 60 * 24)
                        }
                    } : {}
            },
            select: {
                id: true,
                imageUrl: true
            }
        });

        new UTApi().deleteFiles(
            (await unusedMedia).map(
                (m) => m.imageUrl
            )
        );

        await prisma.image.deleteMany({
            where: {
                id: {
                    in: unusedMedia.map(m => m.id)
                }
            }
        });

        return new Response();
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}