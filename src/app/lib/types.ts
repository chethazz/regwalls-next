import { Prisma } from "@prisma/client";

export const userDataSelect = {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true
} satisfies Prisma.UserSelect;

export const wallpaperDataInclude = {
    user: {
        select: userDataSelect
    },
    image: {
        select: {
            imageUrl: true
        }
    }
} satisfies Prisma.WallpaperInclude;

export type WallpaperData = Prisma.WallpaperGetPayload<{
    include: typeof wallpaperDataInclude;
}>;

export interface WallpapersPage {
    wallpapers: WallpaperData[];
}