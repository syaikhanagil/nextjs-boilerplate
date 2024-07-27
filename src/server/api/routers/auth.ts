import { hashPassword } from '@/lib/password';
import { registerValidation } from '@/lib/validations/auth.validation';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { db } from '@/server/db';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerValidation)
    .mutation(
      async ({
        input: { name: fullName, email, phone, password: _password },
      }) => {
        const check = await db.user.findUnique({
          where: {
            email: email ?? undefined,
          },
        });

        if (check) {
          return {
            success: false,
            message: 'Email already registered',
          };
        }

        const password = await hashPassword(_password);

        await db.user.create({
          data: {
            fullName,
            email,
            phone,
            password,
          },
        });

        return {
          success: true,
          message: 'Registration successful',
        };
      },
    ),
});
