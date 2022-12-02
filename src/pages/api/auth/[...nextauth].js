import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
//import clientPromise from "src/lib/mongo";

import CredentialsProvider from "next-auth/providers/credentials";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
//  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: "1234",
  debug: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "john" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ]
});