import ArticleBanner from "@/components/features/article/ArticleHeroSection";
import ArticleList from "@/components/features/article/ArticleList.server";
import { Pagination } from "@/components/features/article/ArticlePagination";
import Navbar from "@/components/navigation/Navbar";
import { ArticleResponse } from "@/types/api/article";
import { ArticleEntity } from "@/types/entities/article";


interface ArticlePageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function ArticleFilterPage({ searchParams }: ArticlePageProps) {
  const resolvedSearchParams = await searchParams;
  
  const category = resolvedSearchParams.category ?? "";
  const search = resolvedSearchParams.search ?? "";
  const page = resolvedSearchParams.page ?? "1";

  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);
  if (page) params.append("page", page);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?${params.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Failed to fetch articles:", res.statusText);
    return <p className="text-red-500">Failed to load articles.</p>;
  }

  const data = await res.json() as ArticleResponse;

  const articles: ArticleEntity[] = data.data ?? [];
  const total = data.total ?? 0;
  const currentPage = data.page ?? 1;
  const limit = data.limit ?? 10;
  const totalPages = Math.ceil(total / limit)

  return (
    <main className="flex flex-col items-center w-full">
      <Navbar className="md:hidden"/>
      <ArticleBanner />

      <section className="py-10 px-4 w-full max-w-7xl">
        <ArticleList articles={articles} total={total} />
      </section>

      <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </main>
  );
}
