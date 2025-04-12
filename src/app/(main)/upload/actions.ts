"use server";

import { UploadFormValues, uploadSchema, UploadValues } from "@/app/lib/validation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function post(input:UploadValues) {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");


    const {
        imageId,
        title,
        description,
        category
    } = uploadSchema.parse(input)

    const newPost = await prisma.image.update({
        where: { id: imageId },
        data: {
            title,
            description,
            category,
            userId: user.id
        }
    });

    return newPost;
}