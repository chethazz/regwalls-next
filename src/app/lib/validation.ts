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

export const imageSchema = z.object({
    imageUrl: z.string().url("Invalid image URL"),
    title: z.string().trim().min(1, "Title is required"),
    description: optionalString,
    category: optionalString
});

export type ImageValues = z.infer<typeof imageSchema>;

export const uploadSchema = z.object({
    imageUrl: z.string().max(1, "Cannot post multiple images at once"),
    title: z.string().trim().min(1, "Title is required"),
    description: optionalString,
    category: optionalString
});

export type UploadValues = z.infer<typeof uploadSchema>;