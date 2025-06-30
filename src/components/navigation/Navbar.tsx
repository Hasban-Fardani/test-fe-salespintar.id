"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, ChevronDown } from "lucide-react";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getUserAuthenticated } from "@/lib/auth";
import { useEffect, useState } from "react";
import { UserEntity } from "@/types/entities/user";

interface NavbarProps {
  variant?: 'default' | 'transparent';
  className?: string;
}

export default function Navbar({ variant = 'default', className = '' }: NavbarProps) {
  const router = useRouter();
  const isTransparent = variant === 'transparent';

  const imageSrc = variant === 'transparent' ? '/images/logo-ipsum-white.png' : '/images/logo-ipsum.png';

  const [user, setUser] = useState<UserEntity | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserAuthenticated({ redirectLogin: false });
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8 py-4 transition-all duration-200",
        {
          "bg-transparent border-b border-gray-200 md:border-0": isTransparent,
          "bg-white border-b border-gray-200": !isTransparent,
        },
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src={imageSrc}
            alt="Logoipsum"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`flex items-center space-x-2 h-auto px-2 py-1 rounded-lg focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-ring ${variant === 'transparent' ? 'hover:bg-gray-500' : ''}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
                <span className={`hidden sm:block text-sm font-medium text-gray-900 underline ${variant === 'transparent' ? 'text-white' : ''}`}>
                  {user.username}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem asChild>
                <Link href="/user/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>My Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}