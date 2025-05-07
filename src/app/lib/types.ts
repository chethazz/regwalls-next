import { Prisma } from "@prisma/client";

export const userDataSelect = {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true
} satisfies Prisma.UserSelect;

export type UserData = Prisma.UserGetPayload<{
    select: typeof userDataSelect;
}>;

export function getUserWallpaperDataInclude(loggedInUserId: string) {
    return {
        user: {
            select: userDataSelect
        },
        image: {
            select: {
                imageUrl: true
            }
        },
        favorites: {
            where: {
                userId: loggedInUserId
            },
            select: {
                userId: true
            }
        }
    } satisfies Prisma.WallpaperInclude;
}

export type UserWallpaperData = Prisma.WallpaperGetPayload<{
    include: ReturnType<typeof getUserWallpaperDataInclude>;
}>;

export const wallpaperDataInclude = {
    user: {
        select: userDataSelect
    },
    image: {
        select: {
            imageUrl: true
        }
    },
} satisfies Prisma.WallpaperInclude;

export type WallpaperData = Prisma.WallpaperGetPayload<{
    include: typeof wallpaperDataInclude;
}>;

export interface WallpapersPage {
    wallpapers: WallpaperData[] | UserWallpaperData[];
    nextCursor: string | null;
}

export interface FavoriteInfo {
    isFavoritedByUser: boolean;
}