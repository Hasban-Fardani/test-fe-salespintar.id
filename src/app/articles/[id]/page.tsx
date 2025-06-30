import { fetcher } from "@/lib/fetcher";
import { ArticleEntity } from "@/types/entities/article";
import { ArticleCard } from "@/components/features/article/ArticleCard";
import { notFound } from "next/navigation";
import { FeaturedArticle } from "@/components/features/article/FeaturedArticle";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getArticle(id: string): Promise<ArticleEntity | null> {
  try {
    const article = await fetcher(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles/${id}`);
    return article;
  } catch (error) {
    return null;
  }
}

async function getRelatedArticles(currentId: string, categoryId: string): Promise<ArticleEntity[]> {
  try {
    const articles = await fetcher(`${process.env.NEXT_PUBLIC_SITE_URL}/api/articles?exclude=${currentId}&limit=3&category=${categoryId}`);
    return articles;
  } catch (error) {
    return [];
  }
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const articleParams = await params;
  const article = await getArticle(articleParams.id);
  const relatedArticles = await getRelatedArticles(articleParams.id, article?.category?.id ?? '');

  if (!article) {
    return notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <FeaturedArticle article={article} />

        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Other articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}