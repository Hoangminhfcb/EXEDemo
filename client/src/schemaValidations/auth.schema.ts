import z from 'zod'

export const RegisterBody = z
  .object({
    firstName: z.string().trim().min(2).max(256),
    lastName: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    phoneNumber: z
      .string()
      .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
      .max(15, "Số điện thoại không được dài quá 15 chữ số")
      .regex(/^\d+$/, "Số điện thoại chỉ bao gồm các chữ số")
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
      })
    }
  })

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    userId: z.string(),
    email: z.string(),
    fullName: z.string()
})

export type RegisterResType = z.TypeOf<typeof RegisterRes>

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const LoginRes = RegisterRes

export type LoginResType = z.TypeOf<typeof LoginRes>
export const SlideSessionBody = z.object({}).strict()

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>
export const SlideSessionRes = RegisterRes

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>