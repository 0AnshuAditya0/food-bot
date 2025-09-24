import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"

const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email. Please sign up.');
        }
        if (!user.password) {
          throw new Error('This account uses social login. Please sign in with Google or Discord.');
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid password.');
        }
        // Return user object for session
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
          providers: user.providers,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();
        // Check if user already exists with this email
        const existingUser = await User.findOne({ email: user.email });
        if (existingUser) {
          // User exists, check if they have this provider linked
          if (!existingUser.providers.includes(account.provider)) {
            // Add new provider to existing account
            existingUser.providers.push(account.provider);
            await existingUser.save();
            console.log(`Linked ${account.provider} to existing account for ${user.email}`);
          }
          return true;
        } else {
          // Create new user with provider info
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            providers: [account.provider],
            lastLogin: new Date()
          });
          console.log(`Created new user with ${account.provider} for ${user.email}`);
          return true;
        }
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
    async session({ session, token }) {
      try {
        await connectDB();
        // Get user from database
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
          session.user.providers = user.providers;
          session.user.lastLogin = user.lastLogin;
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "jwt",
  },
  events: {
    async signOut({ token }) {
      try {
        await connectDB();
        // Update last login time when user signs out
        if (token.email) {
          await User.findOneAndUpdate(
            { email: token.email },
            { lastLogin: new Date() }
          );
        }
      } catch (error) {
        console.error('Error updating last login:', error);
      }
    },
  },
};

export default function handler(req, res) {
  return NextAuth(req, res, authOptions);
}