import { ArticleHTMLContent } from '@/components/features/article/ArticleHTMLContent';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { ArticleEntity } from '@/types/entities/article';
import { User } from 'lucide-react';
import Image from 'next/image';

interface FeaturedArticleProps {
    article: ArticleEntity;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
    const { title, content, category, createdAt, imageUrl, user: author } = article;
    const imageSrc = imageUrl ?? '/images/placeholder-image.jpg';

    return (
        <article className="bg-white rounded-lg overflow-hidden w-full">
            {/* Article Header */}
            <header className="px-8 pt-8 pb-4 flex flex-col justify-center w-full">
                <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4 text-center">
                    <time>{formatDate(new Date(createdAt).toString())}</time>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Created by {author?.username || 'Admin'}</span>
                    </div>
                </div>

                <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-900 leading-tight mb-6">
                    {title}
                </h1>
            </header>

            {/* Featured Image */}
            <div className="relative h-64 md:h-80 lg:h-96 mx-8 mb-8 rounded-lg overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Article Content */}
            <div className="px-8 pb-8">
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <ArticleHTMLContent content={content} />
                </div>

                {/* Category Badge */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
                    <Badge variant="tag">
                        {category.name}
                    </Badge>
                </div>
            </div>
        </article>
    );
}