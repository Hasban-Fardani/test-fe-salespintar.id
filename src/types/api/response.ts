export interface PaginateResponse<T> {
    data: T[]
    totalData: number,
    currentPage: number,
    totalPages: number,
    limit: number,
}
