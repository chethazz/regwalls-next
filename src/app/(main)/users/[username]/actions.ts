"use server";

import { userDataSelect } from "@/app/lib/types";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/app/lib/validation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function updateUserProfile(values: UpdateUserProfileValues) {
    const validatedValues = await updateUserProfileSchema.parse(values);

    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: validatedValues,
        select: userDataSelect
    });

    return updatedUser;
}