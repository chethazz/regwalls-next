import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createUploadthing, FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
    image: f({
        image: { maxFileSize: "16MB", maxFileCount: 1 }
    })
        .middleware(async () => {
            const { user } = await validateRequest();

            if (!user) throw new UploadThingError("Unauthorized");

            return { user };
        })
        .onUploadComplete(async ({ file }) => {
            const image = await prisma.image.create({
                data: {
                    imageUrl: file.ufsUrl.replace(
                        "/f/",
                        `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}`
                    ),
                }
            });
            return { id: image.id };
        })
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;