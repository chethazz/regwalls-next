import CreateButton from "@/components/CreateButton";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {

    return (
        <header className="sticky top-0 z-10 shadow-sm bg-card">
            <div className="flex flex-wrap items-center gap-5 px-5 py-3 mx-auto max-w-7xl">
                <Link href="/" className="text-2xl font-bold text-primary">
                    Regwalls
                </Link>
                <div className="flex items-center justify-center gap-4 sm:ms-auto">
                    <CreateButton />
                    <UserButton size={36} />
                </div>
            </div>
        </header>
    );
}