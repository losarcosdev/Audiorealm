import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { dbFetchs } from "../../../database";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],

  // Custom pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  session: {
    maxAge: 604800, // 1 week
    updateAge: 86400,
  },
  // Callbacks
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "oauth":
            token.user = await dbFetchs.createOAuthUser(
              user?.email || "",
              user?.name || ""
            );
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
