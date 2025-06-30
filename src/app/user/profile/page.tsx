'use client';

import { useRouter } from 'next/navigation';
import { UserProfileCard } from "@/components/features/profile/UserProfileCard";
import { useState, useEffect } from 'react';
import { UserEntity } from "@/types/entities/user";

export default function ProfilePage() {
    const [user, setUser] = useState<UserEntity | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch('/api/auth/profile');
                
                if (!response.ok) {
                    router.push('/login');
                    return;
                }
                
                const result = await response.json();
                setUser(result.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
                router.push('/login');
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-background">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-background">
            <UserProfileCard user={user} />
        </div>
    );
}