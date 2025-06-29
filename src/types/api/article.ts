import { PaginateResponse } from "@/types/api/response"
import { ArticleEntity } from "@/types/entities/article"

export type ArticleResponse = PaginateResponse<ArticleEntity>
