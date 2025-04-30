"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { cn } from "@/lib/utils";
import { CheckCircle2, Monitor, Moon, Sun, UserRound } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import UserAvatar from "./UserAvatar";

interface UserButtonProps {
    className?: string;
}

export default function UserButton({
    className
}: UserButtonProps) {

    const { user } = useSession();

    const { theme, setTheme } = useTheme();

    if (!user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={cn("flex-none rounded-full cursor-pointer", className)}>
                        <UserAvatar
                            avatarUrl={null}
                            size={40}
                        />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        Please Log in or create an account
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="p-0 m-2">
                        <Link href="/login">
                            <Button variant="secondary" className="w-full cursor-pointer">
                                Log in
                            </Button>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="p-0 m-2">
                        <Link href="/signup">
                            <Button className="w-full cursor-pointer">
                                Sign up
                            </Button>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className={cn("flex-none rounded-full cursor-pointer", className)}>
                    <UserAvatar
                        avatarUrl={user.avatarUrl}
                        size={40}
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    Logged in as <span className="text-muted-foreground">@{user.username}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/users/${user.username}`}>
                    <DropdownMenuItem>
                        <UserRound className="mr-2 size-4" />
                        Profile
                    </DropdownMenuItem>
                </Link>

                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <Monitor className="mr-4 size-4" />
                        Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Monitor />
                                    System
                                </span>
                                {theme === "system" && <CheckCircle2 />}
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Sun />
                                    Light
                                </span>
                                {theme === "light" && <CheckCircle2 />}
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    <Moon />
                                    Dark
                                </span>
                                {theme === "dark" && <CheckCircle2 />}
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}