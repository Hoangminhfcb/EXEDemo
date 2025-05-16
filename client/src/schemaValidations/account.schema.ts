import z from "zod";

export const AccountRes = z
  .object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    fullName: z.string(),
    email: z.string(),
    address: z.string(),
    profileImageUrl: z.string(),
    phoneNumber: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;

export const UpdateMeBody = z.object({
  id: z.string(),
  firstName: z.string().trim().min(1).max(256).optional(),
  lastName: z.string().trim().min(1).max(256).optional(),
  phoneNumber: z.string().trim().optional(),
  profileImageUrl: z.string().trim().optional(),
  address: z.string().trim().optional(),
});

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>;
