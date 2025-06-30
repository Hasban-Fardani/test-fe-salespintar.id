import { UserProfileCard } from "@/components/features/profile/UserProfileCard";
import { getUserAuthenticated } from "@/lib/auth";

export default async function ProfilePage() {
    const user = await getUserAuthenticated({ redirectLogin: true });

    return (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-background">
            <UserProfileCard user={user} />
        </div>
    );
}