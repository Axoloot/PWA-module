import NextAuth from "next-auth";
import User from "src/lib/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: "1234",
  debug: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // new User(credentials);
        return credentials;
        // Add logic here to look up the user from the credentials supplied
        // const user = { id: "1", pseudo: "J Smith", email: "jsmith@example.com", profileImg: null };

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      }
    })
  ]
});