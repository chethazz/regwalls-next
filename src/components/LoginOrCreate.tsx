import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";

export default function LoginOrCreate() {
    return (
        <>
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
        </>
    );
}