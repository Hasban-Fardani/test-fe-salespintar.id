import { ArticleEntity } from "@/types/entities/article";
import { ArticleCard } from "./ArticleCard";

interface ServerArticleListProps {
  articles: ArticleEntity[];
  total: number
}

export default async function ArticleList({ articles, total }: ServerArticleListProps) {
  return (
    <div className="space-y-8">
      <p className="text-sm text-gray-600">
        Showing: {articles.length} of {total} articles
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}