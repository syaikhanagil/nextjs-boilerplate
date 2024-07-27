import { type Prisma } from '@prisma/client';
import { type DefaultSession } from 'next-auth';

type CustomUser = Omit<
  Prisma.UserGetPayload<{
    select: {
      id: true;
      name: true;
      email: true;
      phone: true;
      role: true;
    };
  }>,
  'password'
>;

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: CustomUser;
  }
}
