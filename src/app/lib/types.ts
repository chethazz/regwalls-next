import { Prisma } from "@prisma/client";

export const userDataSelect = {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true
} satisfies Prisma.UserSelect;

export const wallpaperDataInclude = {
    user: {
        select: userDataSelect
    }
} satisfies Prisma.ImageInclude;

export type WallpaperData = Prisma.ImageGetPayload<{
    include: typeof wallpaperDataInclude;
}>;

export interface WallpapersPage {
    wallpapers: WallpaperData[];
}