// User models dựa trên backend Go với snake_case

export interface User {
  user_id: number
  user_account: string
  user_password?: string // Không nên trả về trong response
  user_salt?: string // Không nên trả về trong response
  user_login_time?: string | null
  user_logout_time?: string | null
  user_login_ip?: string | null
  user_created_at?: string | null
  user_updated_at?: string | null
  is_two_factor_enabled?: boolean | null
}

export interface UserProfile {
  user_id: number
  user_account: string
  user_nickname?: string | null
  user_avatar?: string | null
  user_state: number // 0-Locked, 1-Activated, 2-Not Activated
  user_mobile?: string | null
  user_gender?: number | null // 0-Secret, 1-Male, 2-Female
  user_birthday?: string | null
  user_email?: string | null
  user_is_authentication: number // 0-Not Authenticated, 1-Pending, 2-Authenticated, 3-Failed
  created_at?: string | null
  updated_at?: string | null
}

export interface UserTwoFactor {
  two_factor_id: number
  user_id: number
  two_factor_auth_type: string // SMS, Email, App
  two_factor_auth_secret: string
  two_factor_phone?: string | null
  two_factor_email?: string | null
  two_factor_is_active: boolean
  two_factor_created_at?: string | null
  two_factor_updated_at?: string | null
}

export interface UserVerification {
  verify_id: number
  verify_otp: string
  verify_key: string
  verify_key_hash: string
  verify_type?: number | null
  is_verified?: number | null
  is_deleted?: number | null
  verify_created_at?: string | null
  verify_updated_at?: string | null
}

// Response types cho API
export interface UserLoginResponse {
  user: User
  tokens: {
    access_token: string
    refresh_token: string
    expires_at: string
  }
}

export interface UserRegisterResponse {
  user_id: number
  message: string
}

// Request types cho API
export interface UserLoginRequest {
  user_account: string
  user_password: string
}

export interface UserRegisterRequest {
  user_account: string
  user_password: string
  user_email?: string
  user_mobile?: string
}

export interface UserUpdateProfileRequest {
  user_nickname?: string
  user_avatar?: string
  user_mobile?: string
  user_gender?: number
  user_birthday?: string
  user_email?: string
}

// Enums
export enum UserState {
  LOCKED = 0,
  ACTIVATED = 1,
  NOT_ACTIVATED = 2
}

export enum UserGender {
  SECRET = 0,
  MALE = 1,
  FEMALE = 2
}

export enum UserAuthenticationStatus {
  NOT_AUTHENTICATED = 0,
  PENDING = 1,
  AUTHENTICATED = 2,
  FAILED = 3
}

export enum TwoFactorAuthType {
  SMS = "SMS",
  EMAIL = "Email",
  APP = "App"
}
