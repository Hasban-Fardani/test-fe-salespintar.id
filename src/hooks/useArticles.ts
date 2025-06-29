import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { ArticleEntity } from '@/types/entities/article';

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

  const { data, error, isLoading, mutate } = useSWR<{
    articles: ArticleEntity[];
    total: number;
    currentPage: number;
    totalPages: number;
  }>(url, fetcher);

  return {
    articles: data?.articles || [],
    total: data?.total || 0,
    currentPage: data?.currentPage || 1,
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
    mutate,
  };
}
