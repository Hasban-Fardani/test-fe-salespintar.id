import apiClient from '@/lib/api';
import { registerSchema } from '@/lib/validators/auth-schema';
import { RegisterResponse } from '@/types/api/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validatedData = registerSchema.parse(body);

    const response = await apiClient.post<RegisterResponse>('/auth/register', validatedData)

    if (response.status === 401) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Register successful' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid request payload', errors: error.errors }, { status: 400 });
    }

    console.error('[REGISTER_API_ERROR]', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' }, 
      { status: 500 }
    );
  }
}