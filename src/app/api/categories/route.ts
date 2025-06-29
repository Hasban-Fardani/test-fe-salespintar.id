import { NextResponse } from "next/server";
import api from "@/lib/api";

export async function GET() {
  try {
    const { data } = await api.get('/blog/categories');
    return NextResponse.json(data);
  } catch (error) {
    console.error("ERROR: ", error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}