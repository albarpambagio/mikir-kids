import { create } from 'zustand'
import type { User } from '@/types'
import { userIdStorage } from '@/lib/userId'
import { userAPI } from '@/lib/api'

interface AuthState {
  user: User | null
  userId: string | null
  loading: boolean
  initialized: boolean
  setUser: (user: User | null) => void
  setUserId: (userId: string | null) => void
  setLoading: (loading: boolean) => void
  initialize: () => Promise<void>
  loadUser: (userId: string) => Promise<boolean>
  signOut: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userId: null,
  loading: true,
  initialized: false,

  setUser: (user) => set({ user }),
  setUserId: (userId) => {
    set({ userId })
    if (userId) {
      userIdStorage.set(userId)
    } else {
      userIdStorage.remove()
    }
  },
  setLoading: (loading) => set({ loading }),

  initialize: async () => {
    // Add minimum delay to show loading state
    await Promise.all([
      new Promise(resolve => setTimeout(resolve, 300)),
      (async () => {
        try {
          const savedUserId = userIdStorage.get()
          if (savedUserId) {
            // Try to load user profile
            const user = await userAPI.getById(savedUserId)
            set({ 
              user,
              userId: savedUserId,
              loading: false,
              initialized: true,
            })
          } else {
            set({ 
              user: null,
              userId: null,
              loading: false,
              initialized: true,
            })
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
          // Clear invalid user ID
          userIdStorage.remove()
          set({ 
            user: null,
            userId: null,
            loading: false,
            initialized: true,
          })
        }
      })()
    ])
  },

  loadUser: async (userId: string) => {
    try {
      set({ loading: true })
      const user = await userAPI.getById(userId)
      userIdStorage.set(userId)
      set({ 
        user,
        userId,
        loading: false,
      })
      return true
    } catch (error) {
      console.error('Load user error:', error)
      set({ 
        user: null,
        userId: null,
        loading: false,
      })
      return false
    }
  },

  signOut: () => {
    userIdStorage.remove()
    set({ 
      user: null,
      userId: null,
    })
  },
}))

