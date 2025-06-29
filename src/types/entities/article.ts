import { CategoryEntity } from "@/types/entities/category"
import { UserEntity } from "@/types/entities/user"

export interface ArticleEntity {
    id: string
    title: string
    imageUrl: string
    content: string
    userId: string
    categoryId: string,
    createdAt: Date,
    updatedAt: Date,
    category: CategoryEntity,
    user: UserEntity,
}