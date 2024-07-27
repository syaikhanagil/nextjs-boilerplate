import { z } from 'zod';

export const loginValidation = z.object({
  email: z.string(),
  password: z.string(),
});

export const registerValidation = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
});
