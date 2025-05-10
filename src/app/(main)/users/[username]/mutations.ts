import { useUploadThing } from "@/app/lib/uploadthing";
import { UpdateUserProfileValues } from "@/app/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUserProfile } from "./actions";

export function useUpdateProfileMutation() {
    const router = useRouter();

    const { startUpload: startAvatarUpload } = useUploadThing("avatar");

    const mutation = useMutation({
        mutationFn: async ({ values, avatar }: { values: UpdateUserProfileValues, avatar?: File; }) => {
            return Promise.all([
                updateUserProfile(values),
                avatar && startAvatarUpload([avatar])
            ]);
        },
        onSuccess: async () => {
            router.refresh();

            toast.message("Your profile has been updated");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to update profile. Please try again.");
        }
    });

    return mutation;
}