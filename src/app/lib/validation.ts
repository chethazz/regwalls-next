import { z } from "zod";

const usernameString = z.string().trim().min(1, "Username is required")
    .regex(/^[a-z0-9_]+$/, "Only small letters, numbers and _ are allowed");

const optionalString = z.string().trim();

export const signUpSchema = z.object({
    email: z.string().trim().min(1, "Email is required")
        .email("Invalid email address"),
    username: usernameString,
    password: z.string().trim().min(8, "Must be at least 8 characters")
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const logInSchema = z.object({
    username: z.string().trim().min(1, "Email is required"),
    password: optionalString
});

export type LogInValues = z.infer<typeof logInSchema>;

export const uploadFormSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: optionalString,
    category: optionalString
});

export type UploadFormValues = z.infer<typeof uploadFormSchema>;

export const uploadSchema = z.object({
    ...uploadFormSchema.shape,
    imageId: z.string().trim().min(1)
});

export type UploadValues = z.infer<typeof uploadSchema>;

export const updateUserProfileSchema = z.object({
    displayName: z.string().trim().min(1, "Required"),
    bio: z.string().max(1000, "Must be at most 1000 characters"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const updateUsernameSchema = z.object({
    username: usernameString
});

export type UpdateUsernameValue = z.infer<typeof updateUsernameSchema>;