import { FavoriteInfo } from "@/app/lib/types";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ wallpaperId: string; }>; }
) {
    try {
        const { wallpaperId } = await params;

        const { user: loggedInUser } = await validateRequest();

        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const favorite = await prisma.favorite.findUnique({
            where: {
                userId_wallpaperId: {
                    userId: loggedInUser.id,
                    wallpaperId
                }
            }
        });

        const data: FavoriteInfo = {
            isFavoritedByUser: !!favorite
        };

        return Response.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}

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

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ wallpaperId: string; }>; }
) {
    try {
        const { wallpaperId } = await params;

        const { user: loggedInUser } = await validateRequest();

        if (!loggedInUser) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.favorite.deleteMany({
            where: {
                userId: loggedInUser.id,
                wallpaperId
            }
        });

        return new Response();
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}