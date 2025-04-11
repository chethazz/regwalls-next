"use server";

import { uploadSchema } from "@/app/lib/validation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function post(input: {
    imageUrl: string;
    title: string;
    description?: string;
    category?: string;
}) {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    const {
        imageUrl,
        title,
        description,
        category
    } = uploadSchema.parse(input);

    const newPost = await prisma.image.create({
        data: {
            imageUrl,
            title,
            description,
            category,
            userId: user.id
        }
    });

    return newPost;
}