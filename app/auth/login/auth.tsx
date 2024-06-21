import { auth, db } from "@/firebase/firebaseonfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const createUserWithRole = async (
  email: string,
  password: string,
  name: string,
  role: string
) => {
  try {
    // Créer l'utilisateur avec email et mot de passe dans Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Mettre à jour le profil de l'utilisateur avec le nom d'affichage
    await updateProfile(user, { displayName: name });

    // Définir les attributs supplémentaires selon le rôle
    let additionalAttributes: { [key: string]: any } = {};

    switch (role) {
      case "Incendie":
        additionalAttributes = { department: role };
        break;
      case "Accident de la route":
        additionalAttributes = { department: role };
        break;
      case "Urgence médicale":
        additionalAttributes = { department: role };
        break;
      case "Catastrophe naturelle":
        additionalAttributes = { department: role };
        break;
      case "Crime":
        additionalAttributes = { department: role };
        break;
      default:
        additionalAttributes = { department: "user" };
    }

    // Définir le rôle de l'utilisateur et les attributs supplémentaires dans Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: new Date(),
      ...additionalAttributes,
    });
    // Déconnecter l'utilisateur nouvellement créé pour garder l'utilisateur actuel connecté
    await auth.signOut();
    return user;
  } catch (error) {
    console.error(
      "Erreur lors de la création de l'utilisateur avec rôle :",
      error
    );
    throw error;
  }
};