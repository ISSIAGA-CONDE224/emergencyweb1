// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const options: NextAuthOptions = {

//   debug: true, // Activez le mode debug
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("Credentials received:", credentials); // Ajoutez ceci pour voir les credentials
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };
//         //doit etre remplacer par une requete vers l'utilisateur de firebase authentification
//         const user = { id: "42", name: "condeissiaga259@gmail.com", password: "password1234" };
//         if (
//           user?.name === credentials?.email &&
//           credentials?.password === user.password
//         ) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/login",
//   }
// };
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseonfig";

export const options: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;

          if (user) {
            return { id: user.uid, email: user.email, name: user.displayName }; // Inclure le nom de l'utilisateur
          } else {
            return null; // Retourne null si l'authentification échoue
          }
        } catch (error) {
          console.error("Firebase authentication error:", error);
          return null; // Gère les erreurs d'authentification ici et retourne null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Page personnalisée pour la connexion
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
  },
};