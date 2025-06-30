import ArticleBanner from "@/components/features/article/ArticleHeroSection";
import ArticleList from "@/components/features/article/ArticleList.server";
import { Pagination } from "@/components/features/article/ArticlePagination";
import { ArticleResponse } from "@/types/api/article";
import { ArticleEntity } from "@/types/entities/article";

export default async function ArticlePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?limit=9`,
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
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="flex flex-col items-center w-full">
      <ArticleBanner />

      <section className="py-10 px-4 w-full max-w-7xl">
        <ArticleList articles={articles} total={total} />
      </section>

      {total > limit && (
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      )}
    </main>
  );
}
