import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session?.user?.email) return session;

      try {
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
        }
      } catch (error) {
        console.error('Session callback error:', error);
      }

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.error('SignIn callback error:', error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/',
  },
});

export { handler as GET, handler as POST };
