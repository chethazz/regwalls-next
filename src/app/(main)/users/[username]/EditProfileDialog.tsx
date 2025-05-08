import { UserData } from "@/app/lib/types";
import { updateUsernameSchema, UpdateUsernameValue, updateUserProfileSchema, UpdateUserProfileValues } from "@/app/lib/validation";
import avatarPlaceholder from "@/assets/avatarPlaceholder.png";
import CropImageDialog from "@/components/CropImageDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import 'react-advanced-cropper/dist/style.css';
import { useForm } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { updateUsername } from "./actions";
import { useUpdateProfileMutation } from "./mutations";

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

    const mutation = useUpdateProfileMutation();

    const updateUserProfileForm = useForm<UpdateUserProfileValues>({
        resolver: zodResolver(updateUserProfileSchema),
        defaultValues: {
            displayName: user.displayName || "",
            bio: user.bio || ""
        }
    });

    const updateUserNameForm = useForm<UpdateUsernameValue>({
        resolver: zodResolver(updateUsernameSchema),
        defaultValues: {
            username: user.username
        }
    });

    const [croppedAvatar, setCroppedAvatar] = useState<Blob | null>(null);

    async function onSubmit(values: UpdateUserProfileValues) {
        const newAvatarFile = croppedAvatar
            ? new File([croppedAvatar], `avatar_${user.id}.webp`)
            : undefined;

        mutation.mutate(
            {
                values,
                avatar: newAvatarFile
            },
            {
                onSuccess: () => {
                    setCroppedAvatar(null);
                    onOpenChange(false);
                }
            }
        );
    }

    async function onUsernameSubmit(value: UpdateUsernameValue) {
        updateUsername(value);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <Label>Profile picture</Label>
                    <AvatarInput
                        src={croppedAvatar
                            ? URL.createObjectURL(croppedAvatar)
                            : user.avatarUrl || avatarPlaceholder}
                        onImageCropped={setCroppedAvatar}
                    />
                </div>

                <Form {...updateUserNameForm}>
                    <form
                        onSubmit={updateUserNameForm.handleSubmit(onUsernameSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={updateUserNameForm.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Your username"
                                            className="border-none bg-card"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="cursor-pointer"
                        >
                            Change username
                        </Button>
                    </form>
                </Form>

                <Form {...updateUserProfileForm}>
                    <form
                        className="space-y-3"
                        onSubmit={updateUserProfileForm.handleSubmit(onSubmit)}
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
                                    <FormMessage />
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="submit"
                                className="cursor-pointer"
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
    onImageCropped: (blob: Blob | null) => void;
}

function AvatarInput({
    src,
    onImageCropped
}: AvatarInputProps) {

    const [imageToCrop, setImageToCrop] = useState<File>();

    const fileInputRef = useRef<HTMLInputElement>(null);


    function onImageSelected(image: File | undefined) {
        if (!image) return;

        Resizer.imageFileResizer(
            image,
            1024,
            1024,
            "WEBP",
            100,
            0,
            (uri) => setImageToCrop(uri as File),
            "file"
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
                    src={src}
                    alt="Profile picture"
                    width={150}
                    height={150}
                    className="flex-none object-cover rounded-full size-32"
                />
                <span className="absolute bottom-0 right-0 flex items-center justify-center text-white transition-colors duration-200 bg-black rounded-full size-10 bg-opacity-30 group-hover:bg-opacity-20 ">
                    <Camera size={24} />
                </span>
            </button>
            {imageToCrop && (
                <CropImageDialog
                    src={URL.createObjectURL(imageToCrop)}
                    cropAspectRatio={1}
                    onCropped={onImageCropped}
                    onClose={() => {
                        setImageToCrop(undefined);
                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }
                    }}
                />
            )}
        </>
    );
}