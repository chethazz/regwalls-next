"use server";

import { postUploadSchema, UploadValues } from "@/app/lib/validation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function post(input: {
    content: UploadValues;
    imageId: string;
}) {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    const { content, imageId } = input;

    const parsedData = postUploadSchema.parse({
        ...content,
        imageId
    });

    // const {
    //     imageId,
    //     title,
    //     description,
    //     category
    // } = postUploadSchema.parse(input);

    const newPost = await prisma.image.update({
        where: { id: imageId },
        data: {
            title: parsedData.title,
            description: parsedData.description,
            category: parsedData.category,
            userId: user.id
        }
    });

    return newPost;
}