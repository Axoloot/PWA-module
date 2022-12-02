import NextAuth from "next-auth";
import { db } from "../../../lib/database"
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";


console.log(db, global.mongoose.conn)

export default NextAuth({
  // adapter: MongoDBAdapter(db),
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
      // async authorize(credentials, req) {
      //   console.log('couc', req, credentials);
      //   // Add logic here to look up the user from the credentials supplied
      //   const user = { id: "1", pseudo: "J Smith", email: "jsmith@example.com", profileImg: null };

      //   if (user) {
      //     // Any object returned will be saved in `user` property of the JWT
      //     return user
      //   } else {
      //     // If you return null then an error will be displayed advising the user to check their details.
      //     return null

      //     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
      //   }
      // }
    })
  ]
});