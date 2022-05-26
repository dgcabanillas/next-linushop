import NextAuth from 'next-auth';
import FacebookProvider from "next-auth/providers/facebook";
import Credentials from 'next-auth/providers/credentials';

import { DBUsers } from '../../../source/database';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
      async authorize(credentials) {
        return await DBUsers.checkUserEmailPassword( credentials!.email, credentials!.password );
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    })
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400,
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if ( account ) {
        token.accessToken = account.access_token;
        switch( account.type ) {
          case 'oauth': 
            token.user = await DBUsers.oAuthToDBUser( user?.email || '', user?.name || '' );
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }
      return token;
    },

    async session({ session, token, user }){
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    }
  }
});