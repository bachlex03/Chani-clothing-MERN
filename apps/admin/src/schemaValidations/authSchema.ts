import { z } from 'zod';

export const authSchema = z.object({
   email: z.string().email({ message: 'Invalid email address' }),
   password: z.string().min(4),
});
