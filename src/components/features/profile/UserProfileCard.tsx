import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserEntity } from "@/types/entities/user";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface UserProfileCardProps {
  user: UserEntity;
}

const getInitial = (name: string): string => {
  return name ? name.charAt(0).toUpperCase() : "U";
};

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="flex flex-col justify-center items-center pb-6">
          <h1 className="text-2xl font-bold tracking-tight mb-4">
            User Profile
          </h1>
          <Avatar className="h-24 w-24">
            <AvatarFallback className="text-4xl bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
              {getInitial(user.username)}
            </AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800/50 p-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Username
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-50">
                {user.username}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800/50 p-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Password
              </span>
              {/* PENTING: Jangan pernah menampilkan password asli. */}
              <span className="font-mono text-sm tracking-widest text-gray-900 dark:text-gray-50">
                ********
              </span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-gray-100 dark:bg-gray-800/50 p-3">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Role
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-50">
                {user.role || "User"}
              </span>
            </div>
          </div>
          <Link
            href="/"
            className={buttonVariants({
              variant: "default",
              className: "w-full mt-6",
            })}
          >
            Back to home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}