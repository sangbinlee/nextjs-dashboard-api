import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
// import bcrypt from 'bcryptjs';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;

    const url = `http://localhost:8088/users?email=${email}`
    console.log(`### url=${url}`)
    const res = await fetch(url);
    const user = await res.json();
    console.log('user is',user)
    console.log('user[0] is',user[0])

    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          
          // get user
          const user = await getUser(email);




          if (!user) return null;
          // const passwordsMatch = await bcrypt.compare(password, user.password);
          const passwordsMatch = (password === user.password);
          console.log('passwordsMatch is', passwordsMatch)
          if (passwordsMatch) return user;
        }
 
        console.error('[error] Invalid credentials');
        return null;
      },
    }),
  ],
});