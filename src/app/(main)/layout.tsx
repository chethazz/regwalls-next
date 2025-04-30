import { validateRequest } from "@/auth";
import Navbar from "./Navbar";
import SessionProvider from "./SessionProvider";

export default async function Layout({
    children
}: { children: React.ReactNode; }) {

    const session = await validateRequest();

    return (
        <SessionProvider value={session}>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                {children}
            </div>
        </SessionProvider>
    );
}