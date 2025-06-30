import apiClient from '@/lib/api';
import { loginSchema } from '@/lib/validators/auth-schema';
import { LoginResponse } from '@/types/api/auth';
import { NextResponse } from 'next/server';
import { cookies } from "next/headers";
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = loginSchema.parse(body);

    const response = await apiClient.post<LoginResponse>('/auth/login', validatedData)

    if (response.status === 401) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const cookieExpiryHours = Number.parseInt(process.env.NEXT_PUBLIC_COOKIE_EXPIRES_HOURS || '24');
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: response.data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * cookieExpiryHours,
    });

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request payload', errors: error.errors }, { status: 400 });
    }

    console.error('[LOGIN_API_ERROR]', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}