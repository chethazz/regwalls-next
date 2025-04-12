import { Prisma } from "@prisma/client";

export const wallpaperDataInclude = {
    user: {
        select: {
            id: true,
            username: true,
            displayName: true,
            avatarUrl: true,
        }
    }
} satisfies Prisma.ImageInclude;

export type WallpaperData = Prisma.ImageGetPayload<{
    include: typeof wallpaperDataInclude;
}>;

export interface WallpapersPage {
    wallpapers: WallpaperData[];
}