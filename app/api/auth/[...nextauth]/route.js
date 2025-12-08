import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
          
          const res = await fetch(`${process.env.BACKEND_URI}/api/v1/users/login`, {
            method: 'POST',
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            }),
            headers: { "Content-Type": "application/json" }
          });
          
          const response = await res.json();
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
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })

  ],

  callbacks: {
    
    async jwt({ token, user, account }) {
      if (user) {

        if (account?.provider === "google") {
          console.log("1. Google Login Detected. Email:", user.email);
          try {
            const res = await fetch(`${process.env.BACKEND_URI}/api/v1/users/google-auth`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: user.name,
                email: user.email,
                image: user.image
              })
            });
            console.log("3. Backend Status:", res.status);

            const response = await res.json();

            if (response.statusCode === 200 && response.data) {
              console.log("✅ Backend Sync Success! Saving tokens.");
              token._id = response.data.user._id;
              token.accessToken = response.data.accessToken;
              token.refreshToken = response.data.refreshToken;
              token.image = response.data.user.image;
            }
          } catch (error) {
            console.error("Google Sync Error:", error);
          }
        }
        
        else {
          token._id = user._id;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.image = user.image;
        }
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
