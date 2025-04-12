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

export const uploadSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: optionalString,
    category: optionalString
});

export type UploadValues = z.infer<typeof uploadSchema>;

export const postUploadSchema = z.object({
    ...uploadSchema.shape,
    imageId: z.string().trim().min(1)
});

export type PostUploadValues = z.infer<typeof postUploadSchema>;