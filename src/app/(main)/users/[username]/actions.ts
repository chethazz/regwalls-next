"use server";

import { userDataSelect } from "@/app/lib/types";
import { updateUsernameSchema, UpdateUsernameValue, updateUserProfileSchema, UpdateUserProfileValues } from "@/app/lib/validation";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

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

export async function updateUsername(value: UpdateUsernameValue):
    Promise<{ error: string; }> {
    try {
        const validatedValue = await updateUsernameSchema.parse(value);

        const { user } = await validateRequest();

        if (!user) throw new Error("Unauthorized");

        const existingUsername = await prisma.user.findFirst({
            where: {
                username: {
                    equals: validatedValue.username,
                    mode: "insensitive"
                }
            }
        });

        if (existingUsername) {
            return {
                error: "Username already taken"
            };
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                username: validatedValue.username
            }
        });

        return redirect(`/users/${updatedUser.username}`);
    } catch (error) {
        if (isRedirectError(error)) throw error;
        console.error(error);
        return {
            error: "Something went wrong. Please try again!"
        };
    }
}