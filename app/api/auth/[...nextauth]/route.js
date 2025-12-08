import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials) {
        try {
            console.log('login api calling');
          const res = await fetch(`http://localhost:2000/api/v1/users/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
            headers: { "Content-Type": "application/json" }
          });
          console.log('api called');
          
          console.log(`raw res`, res);
          const response = await res.json();
          console.log('api response' , response);

          if (response.statusCode === 200 && response.data) {
            return {
              _id: response.data.user._id,
              email: response.data.user.email,
              name: response.data.user.fullName || response.data.user.name,
              image: response.data.user.image, 
              accessToken: response.data.accessToken, 
              refreshToken: response.data.refreshToken
            };
          }
          
          return null;

        } catch (error) {
          console.error("Login Error:", error);
          return null;
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.image = user.image;
      }
      return token;
    },
    
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.image = token.image;
      return session;
    }
  },
  
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
