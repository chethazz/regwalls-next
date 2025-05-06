import { userDataSelect } from "@/app/lib/types";
import { validateRequest } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { UserRound } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import EditProfileButton from "./EditProfileButton";
import Favorites from "./Favorites";
import UserWallpapers from "./UserWallpapers";

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

    const { user: loggedInUser } = await validateRequest();

    const { username } = await params;

    const user = await getUser(username);

    if (!user) return notFound();

    return (
        <main className="flex flex-col items-center justify-center gap-5 p-5">
            <div className="justify-between block w-full gap-5 p-10 py-5 space-y-5 bg-secondary sm:flex max-w-7xl md:flex rounded-2xl">
                {user.avatarUrl ? (
                    <Image
                        src={user.avatarUrl}
                        alt="Profile picture"
                        className="rounded-full"
                        height={200}
                        width={200}
                    />
                ) : (
                    <UserRound size={200} className="rounded-full bg-background" />
                )}
                <div className="w-full space-y-3">
                    <div>
                        <h1 className="text-2xl font-semibold">{user.displayName}</h1>
                        <h1 className="text-2xl text-muted-foreground">@{user.username}</h1>
                    </div>
                    {user.bio && <p className="text-muted-foreground">{user.bio}</p>}
                </div>
                {loggedInUser && user.id === loggedInUser.id && (
                    <div className="flex flex-col justify-end">
                        <EditProfileButton
                            user={user}
                        />
                    </div>
                )}
            </div>
            <Tabs defaultValue="wallpapers" className="w-full max-w-7xl">
                <TabsList>
                    <TabsTrigger value="wallpapers">Wallpapers</TabsTrigger>
                    <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                <TabsContent value="wallpapers" className="space-y-5">
                    <h1 className="text-3xl font-bold text-center">Wallpapers by {user.displayName}</h1>
                    <UserWallpapers userId={user.id} />
                </TabsContent>
                <TabsContent value="favorites" className="space-y-5">
                    <h1 className="text-3xl font-bold text-center">{user.displayName}&apos;s Favorites</h1>
                    <Favorites userId={user.id} />
                </TabsContent>
            </Tabs>
        </main>
    );
}