import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { ArticleResponse } from '@/types/api/article';

interface UseArticleParams {
  category?: string;
  search?: string;
  page?: number;
}

export function useArticle({ category, search, page = 1 }: UseArticleParams = {}) {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  if (page) params.append('page', String(page));

  const url = `/api/articles?${params.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<ArticleResponse>(url, fetcher);
  const total = data?.total || 0;
  const limit = data?.limit || 10;
  const totalPage = Math.ceil(total / limit || 1);
  return {
    articles: data?.data || [],
    total: data?.total || 0,
    currentPage: data?.page || 1,
    totalPages: totalPage || 1,
    isLoading,
    error,
    mutate,
  };
}
