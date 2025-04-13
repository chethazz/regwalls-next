"use server";

import { uploadSchema, UploadValues } from "@/app/lib/validation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function post(input: UploadValues) {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");


    const {
        imageId,
        title,
        description,
        category
    } = uploadSchema.parse(input);

    const newWallpaper = await prisma.$transaction(async (tx) => {
        const newWallpaper = await tx.wallpaper.create({
            data: {
                title,
                description,
                category,
                userId: user.id,
                image: {
                    connect: {
                        id: imageId
                    }
                }
            }
        });

        await tx.image.update({
            where: { id: imageId },
            data: {
                wallpaperId: newWallpaper.id
            }
        });
    });

    return newWallpaper;
}