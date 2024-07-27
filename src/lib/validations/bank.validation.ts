import { z } from 'zod';

export const getBanksValidation = z.object({
  id: z.string().optional(),
});

export const getBankValidation = z.object({
  id: z.string(),
});

export const createBankValidation = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  price: z.number(),
});
