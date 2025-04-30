import UserButton from "@/components/UserButton";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 shadow-sm bg-card">
            <div className="flex flex-wrap items-center gap-5 px-5 py-3 mx-auto max-w-7xl">
                <Link href="/" className="text-2xl font-bold text-primary">
                    Regwalls
                </Link>
                <div className="flex items-center justify-center gap-4 sm:ms-auto">
                    <Link
                        href="/upload"
                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm shadow-2xl bg-primary text-secondary rounded-2xl"
                    >
                        Create
                        <Plus className="size-4" />
                    </Link>
                    <UserButton />
                </div>
            </div>
        </header>
    );
}