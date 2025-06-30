import { redirect } from "next/navigation";
import { UserEntity } from "@/types/entities/user";

interface GetUserAuthenticatedParams {
    redirectLogin?: boolean
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export async function getUserAuthenticated({ redirectLogin = false }: GetUserAuthenticatedParams): Promise<UserEntity> {
    const url = `${baseUrl}/api/auth/profile`;
    const response = await fetch(url);

    if (!response.ok && !redirectLogin) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    if (!response.ok && redirectLogin) {
        redirect("/login");
    }

    const result = await response.json();
    return result.data;
}
