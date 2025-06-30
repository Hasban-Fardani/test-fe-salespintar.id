import { NextResponse } from "next/server";
import apiClient from "@/lib/api";
import { CategoryResponse } from "@/types/api/category";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const search = searchParams.get('search');

  const params: Record<string, string | number> = { page };
  if (limit) params.limit = limit;
  if (search) params.title = search;

  try {
    const { data } = await apiClient.get<CategoryResponse>('/categories', {
      params
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("ERROR: ", error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}