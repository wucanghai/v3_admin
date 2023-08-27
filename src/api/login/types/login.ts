// export interface ILoginRequestData {
//   /** admin 或 editor */
//   username: 'admin' | 'editor'
//   /** 密码 */
//   password: string
// }

export type LoginCodeResponseData = {
  username: 'admin' | 'editor'
  /** 密码 */
  password: string
}

interface IloginResponseData {
  token: string
  code: number
  message: string
}

export type LoginResponseData = IApiResponseData<IloginResponseData>

// export type UserInfoResponseData = IApiResponseData<{
//   username: string
//   roles: string[]
// }>
