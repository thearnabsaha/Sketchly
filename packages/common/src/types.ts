import { z } from 'zod';
export const SignupSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(50, { message: 'Name must be at most 50 characters long' }),
    photo: z
        .string()
        .url({ message: 'Photo must be a valid URL' })
        .optional()
        .or(z.literal('')),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
export const SigninSchema = z.object({
  username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&]/, { message: 'Password must contain at least one special character' }),
});
export const InputSchema = z.object({
    msg: z.string().min(1),
})
export const RoomInputSchema = z.object({
    roomId: z.string().min(6).max(6),
})
export const RoomSlugSchema = z.object({
    roomSlug: z.string().length(6)
})