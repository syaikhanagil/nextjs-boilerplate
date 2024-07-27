import { getServerSession, type NextAuthOptions } from 'next-auth';

import { exclude } from '@/lib/execlude';
import { comparePassword } from '@/lib/password';
import { loginValidation } from '@/lib/validations/auth.validation';
import { db } from '@/server/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validate = loginValidation.safeParse(credentials);
        if (!validate) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials?.email ?? '' },
        });

        if (!user) return null;

        if (
          !(await comparePassword(credentials?.password ?? '', user.password))
        )
          return null;

        return exclude(user, ['password']);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user: _user, session: _session, trigger }) {
      if (_user) token.user = _user;
      if (trigger === 'update') {
        const sessionValidation = z.object({
          userId: z.string(),
        });

        const session = sessionValidation.safeParse(_session).success
          ? sessionValidation.parse(_session)
          : null;

        if (session) {
          const user = await db.user.findUnique({
            where: { id: session?.userId },
          });
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment */
          token.user = user ? (exclude(user, ['password']) as any) : null;
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token.user,
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
