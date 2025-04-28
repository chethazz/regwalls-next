import { userDataSelect } from "@/app/lib/types";
import prisma from "@/lib/prisma";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import UserWallpapers from "./UserWallpapers";
import EditProfileButton from "./EditProfileButton";

interface PageProps {
    params: Promise<{ username: string; }>;
}

const getUser = cache(async (username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: {
                equals: username,
                mode: "insensitive"
            }
        },
        select: userDataSelect
    });

    if (!user) notFound();

    return user;
});

export async function generateMetadata({ params }: PageProps) {
    const { username } = await params;

    const user = await getUser(username);

    return {
        title: `${user.displayName}`
    };
}

export default async function Page({
    params
}: PageProps) {

    const { username } = await params;

    const user = await getUser(username);

    if (!user) return notFound();

    return (
        <main className="flex flex-col items-center justify-center gap-5 p-5">
            <div className="justify-between space-y-5 block w-full gap-5 p-10 py-5 bg-secondary sm:flex max-w-7xl md:flex rounded-2xl">
                {user.avatarUrl ? (
                    <Image
                        src={user.avatarUrl}
                        alt="Profile picture"
                        className="rounded-full"
                        height={150}
                        width={150}
                    />
                ) : (
                    <UserRound size={200} className="rounded-full bg-background" />
                )}
                <div className="flex flex-col justify-between md:w-[60%] w-full">
                    <div>
                        <h1 className="text-2xl font-semibold">{user.displayName}</h1>
                        <h1 className="text-2xl text-muted-foreground">@{user.username}</h1>
                    </div>
                    {user.bio && <p>{user.bio}</p>}
                </div>
                <div className="flex flex-col justify-end">
                    <EditProfileButton
                    user={user}
                    />
                </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Wallpapers by {user.displayName}</h1>
            <UserWallpapers userId={user.id} />
        </main>
    );
}