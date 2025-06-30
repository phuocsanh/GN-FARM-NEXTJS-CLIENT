import z from "zod"

export const AccountRes = z
  .object({
    data: z.object({
      userId: z.number(),
      userAccount: z.string(),
      userNickname: z.string().optional(),
      userAvatar: z.string().optional(),
      userEmail: z.string().optional(),
    }),
    message: z.string(),
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const UpdateMeBody = z.object({
  user_nickname: z.string().trim().min(2).max(256).optional(),
  user_avatar: z.string().url().optional(),
  user_mobile: z.string().optional(),
  user_email: z.string().email().optional(),
  user_gender: z.number().min(0).max(2).optional(),
  user_birthday: z.string().optional(),
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>
