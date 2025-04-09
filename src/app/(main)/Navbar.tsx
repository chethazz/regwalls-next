import { UserRound } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10 shadow-sm bg-card">
            <div className="flex flex-wrap items-center justify-center gap-5 px-5 py-3 mx-auto max-w-7xl">
                <Link href="/" className="text-2xl font-bold text-primary">
                    Regwalls
                </Link>
                <UserRound className="sm:ms-auto" />
            </div>
        </header>
    );
}