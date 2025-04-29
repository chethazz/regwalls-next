"use client";

import { UserData } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

interface EditProfileButtonProps {
    user: UserData;
}

export default function EditProfileButton({
    user
}: EditProfileButtonProps) {

    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <Button
             onClick={() => setShowDialog(true)}
             className="cursor-pointer"
             >
                Edit profile
            </Button>
            <EditProfileDialog
                user={user}
                open={showDialog}
                onOpenChange={setShowDialog}
            />
        </>
    );
}