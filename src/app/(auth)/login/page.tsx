import { Metadata } from "next";
import Link from "next/link";
import LogInForm from "./LogInForm";

export const metadata: Metadata = {
    title: "Log In"
};

export default function Page() {
    return (
        <main className="flex items-center justify-center h-screen p-5">
            <div className="
              space-y-5 p-5 h-full max-h-[32rem] w-full max-w-[26rem] rounded-2xl outline-hidden shadow-2xl bg-card
            ">
                <div className="space-y-3 text-center">
                    <h1 className="text-3xl font-bold">Log In to Regwalls</h1>
                    <p className="text-muted-foreground">A place to find and upload free wallpapers</p>
                </div>
                <LogInForm />
                <Link
                    href="/signup"
                    className="block text-center hover:underline"
                >
                    Don&apos;t have an account? Sign Up
                </Link>
            </div>
        </main>
    );
}