"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import { Plus } from "lucide-react";
import Link from "next/link";
import LoginOrCreate from "./LoginOrCreate";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function CreateButton() {


    const { user } = useSession();

    if (!user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex items-center justify-center gap-2 px-3 py-2 text-sm shadow-2xl cursor-pointer bg-primary text-secondary rounded-2xl"
                >
                    Create
                    <Plus className="size-4" />
                </DropdownMenuTrigger>

                <LoginOrCreate />
            </DropdownMenu>
        );
    }

    return (
        <Link
            href="/upload"
            className="flex items-center justify-center gap-2 px-3 py-2 text-sm shadow-2xl bg-primary text-secondary rounded-2xl"
        >
            Create
            <Plus className="size-4" />
        </Link>
    );
}