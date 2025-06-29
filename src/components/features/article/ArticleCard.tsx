import { ArticleHTMLContent } from '@/components/features/article/ArticleHTMLContent';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { ArticleEntity } from '@/types/entities/article';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleCardProps {
    article: ArticleEntity;
}

export function ArticleCard({ article }: ArticleCardProps) {
    if (!article) return null
    
    const { id, title, content, category, createdAt, imageUrl } = article
    const imageSrc = imageUrl ?? 'https://placehold.co/600x400/png'
    
    const description = `${content.slice(0, 50)}...`
    return (
        <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow max-w-md min-w-80">
            <div className="relative h-48 w-full">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    loading='lazy'
                    className="object-cover"
                />
            </div>

            <div className="p-6">
                <time className="text-sm text-gray-500 mb-2 block">
                    {formatDate(new Date(createdAt).toString())}
                </time>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/articles/${id}`} className="hover:text-blue-600">
                        {title}
                    </Link>
                </h3>

                <div className="text-gray-600 text-sm mb-4 line-clamp-3">
                    <ArticleHTMLContent content={description} isPreview={true}/>
                </div>

                <Badge variant="tag">
                    {category.name}
                </Badge>
            </div>
        </article>
    );
}
