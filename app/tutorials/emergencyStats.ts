

import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/firebaseonfig";
import { Emergency } from "@/components/emergency/columns";

type EmergencyData = {
  treated: Emergency[];
  pending: Emergency[];
};

export async function getEmergencyData(): Promise<EmergencyData> {
  const q = query(collection(db, "emergencies"));
  const querySnapshot = await getDocs(q);
  
  const treatedEmergencies: Emergency[] = [];
  const pendingEmergencies: Emergency[] = [];
  
  querySnapshot.forEach((doc) => {
    const emergency: Emergency = {
      id: doc.id,
      status: doc.data().isTreat ? 'Traitee' : 'En Attente',
      //status: doc.data().isTreat ? 'Traitee' : 'En Attente',
      name: doc.data().name,
      report: doc.data().report,
      emergencyType: doc.data().emergencyType,
      date: doc.data().createdAt,
      description: doc.data().description,
      imageUrl: doc.data().imageUrl,
      isTreated: doc.data().isTreat,
      phone: doc.data().phone,
      location: doc.data().location
    };

    if (doc.data().isTreat) {
      console.log("danger🤦‍♂️🤦‍♂️🤦‍♂️",doc.data);
      treatedEmergencies.push(emergency);
    } else {
      pendingEmergencies.push(emergency);
    }
  });

  return { treated: treatedEmergencies, pending: pendingEmergencies };
}
