import NextAuth from "next-auth";
import User from "../../../lib/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
        const { email, password } = credentials
        const user = await User.findOne({ email, password });
        console.log(user);


        if (!!user) return user;
        return null;
      }
    })
  ]
};

export default NextAuth(authOptions);