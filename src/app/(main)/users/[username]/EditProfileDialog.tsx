import { UserData } from "@/app/lib/types";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/app/lib/validation";
import avatarPlaceholder from "@/assets/avatarPlaceholder.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";


interface EditProfileDialogProps {
    user: UserData;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function EditProfileDialog({
    user,
    open,
    onOpenChange
}: EditProfileDialogProps) {

    const updateUserProfileForm = useForm<UpdateUserProfileValues>({
        resolver: zodResolver(updateUserProfileSchema),
        defaultValues: {
            displayName: user.displayName || "",
            bio: user.bio || ""
        }
    });

    return (
        <Dialog open onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <Label>Profile picture</Label>
                    <AvatarInput
                        src={user.avatarUrl || avatarPlaceholder}
                    />
                </div>

                <Form {...updateUserProfileForm}>
                    <form
                        className="space-y-3"
                    >
                        <FormField
                            control={updateUserProfileForm.control}
                            name="displayName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Display name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your display name"
                                            className="border-none bg-card"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={updateUserProfileForm.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Your bio"
                                            className="border-none bg-card"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="submit"
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

interface AvatarInputProps {
    src: string | StaticImageData;
}

function AvatarInput({
    src
}: AvatarInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | StaticImageData>(src);


    function onImageSelected(image: File | undefined) {
        if (!image) return;

        Resizer.imageFileResizer(
            image,
            1024,
            1024,
            "WEBP",
            100,
            0,
            (uri) => { if (typeof uri === "string") setSelectedImage(uri); },
            "base64"
        );
    }

    return (
        <>
            <Input
                type="file"
                accept="image/*"
                onChange={(e) => onImageSelected(e.target.files?.[0])}
                ref={fileInputRef}
                className="hidden sr-only"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="relative block group"
            >
                <Image
                    src={selectedImage}
                    alt="Profile picture"
                    width={150}
                    height={150}
                    className="flex-none object-cover rounded-full size-32"
                />
                <span className="absolute bottom-0 right-0 flex items-center justify-center text-white transition-colors duration-200 bg-black rounded-full size-10 bg-opacity-30 group-hover:bg-opacity-20 ">
                    <Camera size={24} />
                </span>
            </button>
        </>
    );
}