import { NextResponse } from 'next/server';
import apiClient from '@/lib/api';
import { ArticleResponse } from '@/types/api/article';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  const params: Record<string, string | number> = { page };
  if (category) params.category = category;
  if (search) params.title = search;

  const res = await apiClient.get<ArticleResponse>('/articles', {
    params,
  });
  
  return NextResponse.json(res.data);
}
