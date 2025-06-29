export interface UserEntity {
    id: string,
    username: string,
    role?: "User" | "Admin"
}