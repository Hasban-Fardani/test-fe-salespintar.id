import { UserEntity } from '@/types/entities/user'
import { create } from 'zustand'

interface AuthStore {
    user: UserEntity | null
    setUser: (user: UserEntity) => void
}

const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user: UserEntity) => set({ user }),
}))

export default useAuthStore
