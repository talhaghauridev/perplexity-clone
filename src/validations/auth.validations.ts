import * as z from 'zod/v4';

export const emailSchema = z.string().trim().email('Please enter a valid email address');

export const passwordSchema = (name = 'Password') =>
  z
    .string()
    .nonempty({ message: `${name} is required` })
    .min(8, { message: `${name} must be at least 8 characters long` })
    .max(64, { message: `${name} must not exceed 64 characters` })
    .refine(val => !/\s/.test(val), {
      message: `${name} cannot contain spaces`,
    });

export const signinValidationSchema = z.object({
  password: passwordSchema(),
  email: emailSchema,
});

export type SignInFormValues = z.infer<typeof signinValidationSchema>;

export const signupValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .transform(val => val.replace(/\s+/g, ' '))
    .pipe(
      z
        .string()
        .nonempty({ message: 'Name is required' })
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(50, { message: 'Name must not exceed 50 characters' })
    ),
  email: emailSchema,
  password: passwordSchema(),
});

export type SignUpFormValues = z.infer<typeof signupValidationSchema>;

const forgotPasswordValidationSchema = z.object({
  email: emailSchema,
});

const resetPasswordValidationSchema = z
  .object({
    password: passwordSchema('New Password'),
    confirmPassword: passwordSchema('Confirm Password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordValidationSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordValidationSchema>;

export { forgotPasswordValidationSchema, resetPasswordValidationSchema };
