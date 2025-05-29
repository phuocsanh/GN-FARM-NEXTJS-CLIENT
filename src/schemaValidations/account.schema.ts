import z from "zod"

export const AccountRes = z
  .object({
    data: z.object({
      user_id: z.number(),
      user_account: z.string(),
      user_nickname: z.string().optional(),
      user_avatar: z.string().optional(),
      user_email: z.string().optional(),
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
