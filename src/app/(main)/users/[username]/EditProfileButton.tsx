"use client";

import { UserData } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EditProfileButtonProps {
    user: UserData;
}

export default function EditProfileButton({
    user
}: EditProfileButtonProps) {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <Button onClick={() => setShowDialog(true)}>
                Edit profile
            </Button>
        </>
    );
}