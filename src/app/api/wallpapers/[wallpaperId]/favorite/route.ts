import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ wallpaperId: string; }>; }
) {
    try {
        const { wallpaperId } = await params;

        const { user: loggedInUser } = await validateRequest();

        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.favorite.upsert({
            where: {
                userId_wallpaperId: {
                    userId: loggedInUser.id,
                    wallpaperId
                }
            },
            create: {
                userId: loggedInUser.id,
                wallpaperId
            },
            update: {}
        });

        return new Response();
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}