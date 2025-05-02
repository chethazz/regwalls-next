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

export function getWallpaperDataInclude(loggedInUserId: string) {
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

export type LoggedInWallpaperData = Prisma.WallpaperGetPayload<{
    include: ReturnType<typeof getWallpaperDataInclude>;
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
    wallpapers: WallpaperData[];
}

export interface FavoriteInfo {
    isFavoritedByUser: boolean;
}