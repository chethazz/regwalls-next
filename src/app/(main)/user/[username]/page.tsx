import { userDataSelect } from "@/app/lib/types";
import prisma from "@/lib/prisma";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

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
        <main className="flex items-center justify-center">
            <div className="block w-full py-5 basis-4 sm:flex max-w-7xl">
                <div className="gap-5 p-10 md:flex bg-secondary rounded-2xl">
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
                    <div className="my-auto">
                        <h1 className="text-2xl font-semibold">{user.displayName}</h1>
                        <h1 className="text-2xl text-muted-foreground">@{user.username}</h1>
                        <p>Bio:</p>
                    </div>
                </div>
            </div>
        </main>
    );
}