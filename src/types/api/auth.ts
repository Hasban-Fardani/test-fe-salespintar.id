export interface LoginResponse {
    token: string
}

export interface RegisterResponse {
    username: string
    password?: string
    role: string
    createdAt: Date
    updatedAt: Date
}

export interface ProfileResponse {
    id: string
    username: string
    role: string
}
