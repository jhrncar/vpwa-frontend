import type { AxiosError, AxiosRequestConfig } from 'axios'
import { ApiToken, LoginCredentials, RegisterData, User, UserStatus } from 'src/contracts'
import { api } from 'src/boot/axios'

class AuthService {
  async me (dontTriggerLogout = false): Promise<User | null> {
    return api.get(
      'auth/me',
      { dontTriggerLogout } as AxiosRequestConfig
    )
      .then((response) => { console.log(response.data); response.data.status = UserStatus.ONLINE; return response.data })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          return null
        }

        return Promise.reject(error)
      })
  }

  async register (data: RegisterData): Promise<User> {
    const response = await api.post<User>('auth/register', data)
    return response.data
  }

  async login (credentials: LoginCredentials): Promise<ApiToken> {
    const response = await api.post<ApiToken>('auth/login', credentials)
    return response.data
  }

  async logout (): Promise<void> {
    await api.post('auth/logout')
  }
}

export default new AuthService()
