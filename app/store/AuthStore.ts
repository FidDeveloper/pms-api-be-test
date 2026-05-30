import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import Config from "@/config"

export type User = {
  id: string
  username: string
  fullname: string
  email: string
  dob: string
}

type AuthStore = {
  token: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
  login: (token: string, refreshToken: string | null, user: User) => void
  setToken: (token: string | null) => void
  setUser: (user: User | null) => void
  logout: () => void
  refreshAccessToken: () => Promise<string | null>
  getUser: () => User | null
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      login: (token, refreshToken, user) => {
        set({ token, refreshToken, user, isAuthenticated: Boolean(token) })
      },
      setToken: (token) => {
        set({ token, isAuthenticated: Boolean(token) })
      },
      setUser: (user) => {
        set({ user })
      },
      logout: () => {
        set({ token: null, refreshToken: null, user: null, isAuthenticated: false })
      },
      refreshAccessToken: async () => {
        const refreshToken = get().refreshToken
        if (!refreshToken) return null

        try {
          const response = await fetch(`${Config.API_URL}/auth/refresh`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refreshToken,
            }),
          })

          if (!response.ok) throw new Error(`Refresh token request failed: ${response.status}`)

          const payload = (await response.json()) as {
            accessToken?: string
            data?: { accessToken?: string }
          }

          const newToken: string | undefined = payload?.data?.accessToken ?? payload?.accessToken

          if (!newToken) throw new Error("Missing access token in refresh response")

          set({ token: newToken, isAuthenticated: true })
          return newToken
        } catch (error) {
          console.error("Error refreshing token:", error)
          get().logout()
          return null
        }
      },
      getUser: () => get().user,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Error rehydrating auth store:", error)
        }
      },
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
