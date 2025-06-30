import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { CategoryResponse } from '@/types/api/category';

interface UseCategoryParams {
  limit?: number;
  search?: string;
  page?: number;
}

export function useCategory({ limit, search, page = 1 }: UseCategoryParams = {}) {
  const params = new URLSearchParams();
  if (limit) params.append('limit', String(limit));
  if (search) params.append('search', search);
  if (page) params.append('page', String(page));

  const url = `/api/categories?${params.toString()}`;

  const { data, error, isLoading, mutate } = useSWR<CategoryResponse>(url, fetcher);

  return {
    data: data?.data || [],
    total: data?.totalData || 0,
    currentPage: data?.currentPage || 1,
    totalPages: data?.totalPages || 1,
    isLoading,
    error,
    mutate,
  };
}
