import { authRequest, unauthRequest } from "./http"
import { useAuthStore } from "../../store/AuthStore"
import type { User } from "../../store/AuthStore"

const AUTH_PATH = "user/auth"

export type LoginPayload =
  | { username: string; email?: never; password: string }
  | { email: string; username?: never; password: string }

type LoginResponseData = {
  accessToken: string
  refreshToken: string
  user: User
}

type ApiResponse<T> = {
  data: T
  message?: string
  status?: string | number
}

/**
 * POST /user/auth/login
 * Authenticates the user and persists token + user to the auth store.
 */
export const login = async (payload: LoginPayload): Promise<LoginResponseData> => {
  const json = await unauthRequest.post<ApiResponse<LoginResponseData>>(
    `${AUTH_PATH}/login`,
    payload,
  )

  const { accessToken, refreshToken, user } = json.data

  if (!accessToken || !user) {
    throw new Error("Invalid login response: missing token or user")
  }

  useAuthStore.getState().login(accessToken, refreshToken ?? null, user)

  return json.data
}

/**
 * POST /user/auth/logout
 * Calls the logout endpoint then clears all local auth state.
 * Local state is always cleared even if the API call fails.
 */
export const logout = async (): Promise<void> => {
  try {
    await authRequest.post(`${AUTH_PATH}/logout`)
  } catch (error) {
    console.error("Logout request error:", error)
  } finally {
    // Always clear local session regardless of API result
    useAuthStore.getState().logout()
  }
}
