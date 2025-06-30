import apiClient from "@/lib/api";
import { UserEntity } from "@/types/entities/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const response = await apiClient.get<UserEntity>('/auth/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    
    if (response.status === 401) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ data: response.data });
}