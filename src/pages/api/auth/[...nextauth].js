// src/pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { executeQuery } from '../../../../lib/db';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const usuarios = await executeQuery({
          query: 'SELECT * FROM usuarios WHERE email = ?',
          values: [email],
        });

        if (usuarios.length === 0) {
          return null; // Usuário não encontrado
        }

        const usuario = usuarios[0];
        const senhaValida = await compare(password, usuario.senha);

        if (!senhaValida) {
          return null; // Senha inválida
        }

        return { email: usuario.email, id: usuario.id }; // Retorna o usuário
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.uid;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Adicione uma variável de ambiente NEXTAUTH_SECRET
});