// // // pages/api/emergency-stats.ts
// // import { NextApiRequest, NextApiResponse } from 'next';
// // import { collection, getDocs, query } from "firebase/firestore";
// // import { db } from "@/firebase/firebaseonfig";

// // type EmergencyStatsType = {
// //   [key: string]: number;
// // };

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   const q = query(collection(db, "emergencies"));
// //   const querySnapshot = await getDocs(q);
// //   const data: EmergencyStatsType = {};
// //   querySnapshot.forEach((doc) => {
// //     const emergencyType = doc.data().emergencyType as string;
// //     if (data[emergencyType]) {
// //       data[emergencyType]++;
// //     } else {
// //       data[emergencyType] = 1;
// //     }
// //   });
// //   res.status(200).json(data);
// // }
// // pages/api/emergency-stats.ts
// import { NextApiRequest, NextApiResponse } from 'next';
// import { collection, getDocs, query } from "firebase/firestore";
// import { db } from "@/firebase/firebaseonfig";

// type EmergencyStatsType = {
//   [key: string]: number;
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const q = query(collection(db, "emergencies"));
//   const querySnapshot = await getDocs(q);
//   const data: EmergencyStatsType = {};
//   querySnapshot.forEach((doc) => {
//     const emergencyType = doc.data().emergencyType as string;
//     console.log('emergency type')
//     if (data[emergencyType]) {
//       data[emergencyType]++;
//     } else {
//       data[emergencyType] = 1;
//     }
//   });
//   res.status(200).json(data);
// }
import { Emergency } from "@/components/emergency/columns";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase/firebaseonfig";

export async function getEmergencyData(): Promise<Emergency[]> {
  const q = query(collection(db, "emergencies"));
  const querySnapshot = await getDocs(q);
  const dataArray: Emergency[] = [];
  querySnapshot.forEach((doc) => {
    const emergency: Emergency = {
      id: doc.id,
      status: doc.data().isTreat ? 'Traitee' : 'En Attente',
      name: doc.data().name,
      report: doc.data().report,
      emergencyType: doc.data().emergencyType,
      date: doc.data().createdAt,
      description: doc.data().description,
      imageUrl: doc.data().imageUrl,
      isTreated: doc.data().isTreat,
      phone: doc.data().phone,
      location:{
        longitude:doc.data().location,
        latitude:doc.data().location,
      }
      
    };
    dataArray.push(emergency);
  });
  return dataArray;
}

