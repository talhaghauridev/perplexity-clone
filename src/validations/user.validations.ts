import * as z from 'zod/v4';
import { emailSchema, passwordSchema } from './auth.validations';

const updateProfileValidationSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(64, { message: 'Name must not exceed 64 characters' }),
  email: emailSchema,
  bio: z.string().optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileValidationSchema>;

const changePasswordValidationSchema = z
  .object({
    currentPassword: z
      .string()
      .nonempty({ message: 'Password is required' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(64, { message: 'Password must not exceed 64 characters' }),
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordValidationSchema>;

export { updateProfileValidationSchema, changePasswordValidationSchema };
