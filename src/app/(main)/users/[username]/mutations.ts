import { useUploadThing } from "@/app/lib/uploadthing";
import { UpdateUserProfileValues } from "@/app/lib/validation";
import { QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "./actions";
import { WallpapersPage } from "@/app/lib/types";
import { toast } from "sonner";

export function useUpdateProfileMutation() {
    const router = useRouter();

    const queryClient = useQueryClient();

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