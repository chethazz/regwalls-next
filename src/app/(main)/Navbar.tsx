import { Plus, UserRound } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 shadow-sm bg-card">
            <div className="flex flex-wrap items-center justify-between gap-5 px-5 py-3 mx-auto max-w-7xl">
                <Link href="/" className="text-2xl font-bold text-primary">
                    Regwalls
                </Link>
                <div className="flex items-center justify-center gap-4">
                    <Link
                        href="/upload"
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-secondary rounded-2xl"
                    >
                        Create
                        <Plus />
                    </Link>
                    <UserRound className="sm:ms-auto" />
                </div>
            </div>
        </header>
    );
}