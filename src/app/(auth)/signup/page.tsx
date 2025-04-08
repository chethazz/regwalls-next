import { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
    title: "Sign Up"
};

export default function Page() {
    return (
        <main className="flex items-center justify-center h-screen p-5">
            <div className="
            flex justify-center p-5 items-center h-full max-h-[32rem] w-full max-w-[26rem] rounded-2xl outline-hidden shadow-2xl bg-card
            ">
                <SignUpForm />;
            </div>
        </main>
    );
}