import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {

  debug: true, // Activez le mode debug
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials); // Ajoutez ceci pour voir les credentials
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        //doit etre remplacer par une requete vers l'utilisateur de firebase authentification
        const user =  { id: "42", name: "condeissiaga259@gmail.com", password: "password1234" };
        if (
          user?.name === credentials?.email &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  }
};
