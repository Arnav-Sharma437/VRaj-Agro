import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@vrajagro.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@vrajagro.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        if (credentials.email === adminEmail) {
          // Allow either plain text match (for quick dev setup) or bcrypt hashed password comparison
          const isValid = credentials.password === adminPassword || 
            (adminPassword.startsWith('$2') && await bcrypt.compare(credentials.password, adminPassword));

          if (isValid) {
            return {
              id: 'admin-id',
              name: 'Vraj Agro Admin',
              email: adminEmail,
              role: 'admin'
            };
          }
        }

        throw new Error('Invalid email or password');
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-dev',
};
