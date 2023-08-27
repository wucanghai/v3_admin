import { request } from '@/utils/service'
import {
  LoginCodeResponseData,
  LoginResponseData
} from '@/api/login/types/login'

export const login = (data: LoginCodeResponseData) => {
  return request<LoginResponseData>({
    url: '/login',
    method: 'POST',
    data
  })
}
