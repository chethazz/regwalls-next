import { UserData } from "@/app/lib/types";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/app/lib/validation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
                    Avatarinput
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