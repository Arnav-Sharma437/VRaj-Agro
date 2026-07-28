import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { loginRateLimiter } from '@/lib/rateLimiter';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@vrajagro.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const ip = req?.headers?.['x-forwarded-for'] || 'unknown';
        
        try {
          await loginRateLimiter.consume(ip as string);
        } catch (rejRes) {
          const secs = Math.round((rejRes as { msBeforeNext: number }).msBeforeNext / 1000);
          const hours = Math.ceil(secs / 3600); // round up to show remaining hours
          throw new Error(`Too many attempts. Try again in ${hours} hours.`);
        }

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@vrajagro.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (credentials.email !== adminEmail) {
          throw new Error('Invalid credentials');
        }

        const isValid = credentials.password === adminPassword || 
          (adminPassword.startsWith('$2') && await bcrypt.compare(credentials.password, adminPassword));

        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: 'admin-id',
          name: 'Vraj Agro Admin',
          email: adminEmail,
          role: 'admin'
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours session expiry
  },
  jwt: {
    maxAge: 8 * 60 * 60, // 8 hours JWT expiry
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/bdis87oanxje1/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
