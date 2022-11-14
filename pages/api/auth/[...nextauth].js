import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
  },
  jwt: {
    secret: "wisdom",
  },
  callbacks: {
    session: ({ session, user }) => {
      session.userId = user.id;
      session.role = user.role;
      return Promise.resolve(session);
    },
  },
});

// jwt: ({ token, user }) => {
//       if (user) {
//         token.id = user._id;
//       }
//       return token;
//     },
