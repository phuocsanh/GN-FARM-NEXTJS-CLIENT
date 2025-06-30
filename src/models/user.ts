// User models dựa trên backend Go với snake_case

export interface User {
  userId: number
  userAccount: string
  userPassword?: string // Không nên trả về trong response
  userSalt?: string // Không nên trả về trong response
  userLoginTime?: string | null
  userLogoutTime?: string | null
  userLoginIp?: string | null
  userCreatedAt?: string | null
  userUpdatedAt?: string | null
  isTwoFactorEnabled?: boolean | null
}

export interface UserProfile {
  userId: number
  userAccount: string
  userNickname?: string | null
  userAvatar?: string | null
  userState: number // 0-Locked, 1-Activated, 2-Not Activated
  userMobile?: string | null
  userGender?: number | null // 0-Secret, 1-Male, 2-Female
  userBirthday?: string | null
  userEmail?: string | null
  userIsAuthentication: number // 0-Not Authenticated, 1-Pending, 2-Authenticated, 3-Failed
  createdAt?: string | null
  updatedAt?: string | null
}

export interface UserTwoFactor {
  twoFactorId: number
  userId: number
  twoFactorAuthType: string // SMS, Email, App
  twoFactorAuthSecret: string
  twoFactorPhone?: string | null
  twoFactorEmail?: string | null
  twoFactorIsActive: boolean
  twoFactorCreatedAt?: string | null
  twoFactorUpdatedAt?: string | null
}

export interface UserVerification {
  verifyId: number
  verifyOtp: string
  verifyKey: string
  verifyKeyHash: string
  verifyType?: number | null
  isVerified?: number | null
  isDeleted?: number | null
  verifyCreatedAt?: string | null
  verifyUpdatedAt?: string | null
}

// Response types cho API
export interface UserLoginResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
    expiresAt: string
  }
}

export interface UserRegisterResponse {
  userId: number
  message: string
}

// Request types cho API
export interface UserLoginRequest {
  userAccount: string
  userPassword: string
}

export interface UserRegisterRequest {
  userAccount: string
  userPassword: string
  userEmail?: string
  userMobile?: string
}

export interface UserUpdateProfileRequest {
  userNickname?: string
  userAvatar?: string
  userMobile?: string
  userGender?: number
  userBirthday?: string
  userEmail?: string
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
