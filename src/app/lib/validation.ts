import { z } from "zod";

const usernameString = z.string().trim().min(1, "Username is required")
    .regex(/^[a-z0-9_]+$/, "Only small letters, numbers and _ are allowed");

export const signUpSchema = z.object({
    email: z.string().trim().min(1, "Email is required")
        .email("Invalid email address"),
    username: usernameString,
    password: z.string().trim().min(8, "Must be at least 8 characters")
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const logInSchema = z.object({
    username: z.string().trim().min(1, "Email is required"),
    password: z.string().trim()
});

export type LogInValues = z.infer<typeof logInSchema>;