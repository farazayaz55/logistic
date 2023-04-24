import { UserDocument } from "~/Models/UserModel";
import Users from "~/Models/UserModel"
import bcrypt from 'bcrypt';
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "~/env.mjs";
import CredentialsProvider from 'next-auth/providers/credentials';

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  providers: [
    CredentialsProvider({
        name: 'Custom Provider',
  
        credentials: {
          email: { label: 'Email', type: 'text', placeholder: 'john@doe.com' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          const { email, password } = credentials as {
              email:string,
              password:string
          };
          const user: UserDocument | null = await Users.findOne({ email });
  
          if (!user) {
            console.log("NO user found")
            throw new Error('User not found');
          }
  
          const isMatch = await bcrypt.compare(password, user.password);
  
          if (!isMatch) {
            throw new Error('Invalid password');
          }
  
          return {
              id:user.id,
              name:user.name,
              password:user.password
          };
        },
      }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};