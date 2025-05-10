import { WallpapersPage } from "@/app/lib/types";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteWallpaper } from "./actions";

export function useDeleteWallpaperMutation() {

    const queryClient = useQueryClient();

    const router = useRouter();
    const pathname = usePathname();

    const mutation = useMutation({
        mutationFn: deleteWallpaper,
        onSuccess: async (deletedWallpaper) => {

            const queryFilter: QueryFilters = { queryKey: ["wallpapers"] };

            await queryClient.cancelQueries(queryFilter);

            queryClient.setQueriesData<InfiniteData<WallpapersPage, string | null>>(
                queryFilter as QueryFilters<InfiniteData<WallpapersPage, string | null>>,
                (oldData) => {
                    if (!oldData) return;

                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map(page => ({
                            nextCursor: page.nextCursor,
                            wallpapers: page.wallpapers.filter(wallpaper => wallpaper.id !== deletedWallpaper.id)
                        }))
                    };
                }
            );
            router.refresh();

            toast.success("Wallpaper has been deleted");

            if (pathname === `/wallpapers/${deletedWallpaper.id}`) {
                router.push(`/users/${deletedWallpaper.user.username}`);
            }
        },
        onError: (error) => {
            console.error(error);
            toast.error("Failed to delete wallpaper. Please try again.");
        }
    });

    return mutation;
}