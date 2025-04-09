import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
    title: "Sign Up"
};

export default function Page() {
    return (
        <main
         className="flex items-center justify-center h-screen p-5"
        style={{ backgroundImage: "url(/background-light.jpg)", backgroundSize: "cover" }}
        >
            <div className="
            p-5 space-y-5 h-full max-h-[32rem] w-full max-w-[26rem] rounded-2xl outline-hidden shadow-2xl bg-card
            ">
                <div className="space-y-3 text-center">
                    <h1 className="text-3xl font-bold">Sign Up to Regwalls</h1>
                    <p className="text-muted-foreground">A place to find and upload free wallpapers</p>
                </div>
                <SignUpForm />
                <Link
                    href="/login"
                    className="block text-center hover:underline"
                >
                    Already have an account? Log In
                </Link>
            </div>
        </main>
    );
}