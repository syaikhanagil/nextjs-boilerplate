import { z } from 'zod';

export const createBankAccountValidation = z.object({
  label: z.string().optional(),
  username: z.string(),
  password: z.string(),
  corporateId: z.string().optional(),
  bankAccountNumber: z.string(),
  bankId: z.string(),
  cronIntervalId: z.string(),
});

export const getBankAccountsValidation = z.object({
  id: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  userId: z.string().optional(),
});

export const getBankAccountValidation = z.object({
  id: z.string(),
});
