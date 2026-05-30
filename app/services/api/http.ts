/**
 * HTTP client helpers for React Native (mobile).
 *
 * - `unauthRequest` — plain requests with no auth header (login, refresh, public endpoints)
 * - `authRequest`   — requests that automatically attach the stored Bearer token;
 *                     if the token is absent the call still fires (server will reject it)
 *
 * Both helpers share a single `request` factory so behaviour is consistent:
 *   • JSON request / response by default
 *   • Throws a typed `ApiError` on non-2xx responses (message comes from server when available)
 */

import Config from "@/config"

import { useAuthStore } from "../../store/AuthStore"

// ─── Types ────────────────────────────────────────────────────────────────────

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export type RequestOptions = {
  method?: HttpMethod
  body?: unknown
  headers?: Record<string, string>
  /** Override the full URL; otherwise pass a path and it is appended to Config.API_URL */
  baseUrl?: string
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

// ─── Core factory ─────────────────────────────────────────────────────────────

const request = async <T>(
  path: string,
  options: RequestOptions & { authHeader?: string },
): Promise<T> => {
  const { method = "GET", body, headers = {}, baseUrl, authHeader } = options

  const url = baseUrl
    ? `${baseUrl}/${path}`.replace(/([^:])\/\//g, "$1/")
    : `${Config.API_URL}/${path}`.replace(/([^:])\/\//g, "$1/")

  const response = await fetch(url, {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      ...(authHeader ? { Authorization: authHeader } : {}),
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
    const err = (await response.json().catch(() => ({}))) as { message?: string }
    throw new ApiError(response.status, err?.message ?? `Request failed: ${response.status}`)
  }

  // 204 No Content — return empty object
  if (response.status === 204) return {} as T

  return response.json() as Promise<T>
}

// ─── Unauthorized client (no token) ───────────────────────────────────────────

/**
 * Use for public endpoints: login, register, forgot-password, token refresh, etc.
 */
export const unauthRequest = {
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "GET", headers }),

  post: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: "POST", body, headers }),

  put: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: "PUT", body, headers }),

  patch: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: "PATCH", body, headers }),

  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "DELETE", headers }),
}

// ─── Authorized client (Bearer token from store) ──────────────────────────────

const getAuthHeader = (): string | undefined => {
  const token = useAuthStore.getState().token
  return token ? `Bearer ${token}` : undefined
}

/**
 * Use for protected endpoints. The current token is read from the auth store
 * on every call so it always reflects the latest value (including after a
 * token refresh).
 */
export const authRequest = {
  get: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "GET", headers, authHeader: getAuthHeader() }),

  post: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: "POST", body, headers, authHeader: getAuthHeader() }),

  put: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: "PUT", body, headers, authHeader: getAuthHeader() }),

  patch: <T>(path: string, body?: unknown, headers?: Record<string, string>) =>
    request<T>(path, { method: "PATCH", body, headers, authHeader: getAuthHeader() }),

  delete: <T>(path: string, headers?: Record<string, string>) =>
    request<T>(path, { method: "DELETE", headers, authHeader: getAuthHeader() }),
}
