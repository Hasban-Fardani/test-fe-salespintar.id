import { ArticleEntity } from "@/types/entities/article"

export interface ArticleResponse {
    data: ArticleEntity[];
    total: number,
    page: number,
    limit: number
}
