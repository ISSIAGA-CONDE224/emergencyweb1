
'use client'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Textarea } from "@/components/ui/textarea";

// import React, { useContext } from "react";
// import { Emergency } from "./columns";
// import { EmergencyContext } from "@/lib/contexts/emergencyContext";
// import { formatDate } from "@/lib/dateFormat";

// interface EmergencyDetailDialogProps {
//   initialIsOpen: boolean;
//   onToggleDialog: () => void;
//   selectedEmergency: Emergency | null;
// }

// type EmergencySchema = {
//   id: string;
//   status: string;
//   name: string;
//   contact: string;
//   report: string;
//   emergencyType: string;
//   date: {
//     seconds: number;
//   };
//   location: {
//     latitude: number;
//     longitude: number;
//   };
// };

// const EmergencyDetailDialog: React.FC<EmergencyDetailDialogProps> = () => {
//   const [emergencyReport, setEmergencyReport] = React.useState<string>("");
//   const { isDialogOpen, toggleDialog, updateEmergency, isLoading, selectedEmergency } =
//     useContext(EmergencyContext);

//   const data: EmergencySchema = {
//     id: selectedEmergency?.id || "",
//     status: selectedEmergency?.status || "",
//     name: selectedEmergency?.name || "",
//     report: selectedEmergency?.report || "",
//     emergencyType: selectedEmergency?.emergencyType || "",
//     contact: selectedEmergency?.phone || "",
//     date: selectedEmergency?.date || {
//       seconds: 0,
//     },
//     location: selectedEmergency?.location || { latitude: 0, longitude: 0 },
//   };

//   const date = new Date(data.date.seconds * 1000);
//   const handleReport = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setEmergencyReport(event.target.value);
//   };

//   const googleMapsUrl = `http://maps.google.com/maps?q=${data.location.latitude}&ll=${data.location.longitude}&z=17`;
//  // const googleMapsUrl = `https://www.google.com/maps?q=${data.location.latitude},${data.location.longitude}`;
// console.log("first",data.location);
//   return (
//     <AlertDialog open={isDialogOpen}>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>
//             <h1>Fais un rapport sur l'urgence</h1>
//           </AlertDialogTitle>
//           <AlertDialogDescription>
//             <div>
//               <span className="font-bold text-lg">Nom :</span>
//               <span> {data.name}</span>
//             </div>
//             <div>
//               <span className="font-bold text-lg">Contact :</span>
//               <span> {data.contact}</span>
//             </div>
//             <div>
//               <span className="font-bold text-lg">Type :</span>
//               <span> {data.emergencyType}</span>
//             </div>
//             <div>
//               <span className="font-bold text-lg">Date :</span>
//               <span> {formatDate(date)}</span>
//             </div>
//             <div>
//               <span className="font-bold text-lg">Statut :</span>
//               <span> {data.status}</span>
//               <div>
//                 <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
//                   Voir sur Google Maps
//                 </a>
//               </div>
//             </div>
//             {data.status !== "Traitee" ? (
//               <Textarea value={emergencyReport} onChange={handleReport} placeholder="Ecrivez votre rapport sur l'urgence." />
//             ) : (
//               <div>{data.report}</div>
//             )}
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           {data.status !== "Traitee" ? (
//             <AlertDialogAction
//               disabled={isLoading}
//               className="bg-blue-500 text-white hover:bg-blue-600"
//               onClick={() => updateEmergency({ id: data.id, report: emergencyReport })}
//             >
//               Mettre à jour
//             </AlertDialogAction>
//           ) : null}
//           <AlertDialogAction onClick={() => toggleDialog(null)}>Fermer</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

// export default EmergencyDetailDialog;

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

import React, { useContext } from "react";
import { Emergency } from "./columns";
import { EmergencyContext } from "@/lib/contexts/emergencyContext";
import { formatDate } from "@/lib/dateFormat";

interface EmergencyDetailDialogProps {
  initialIsOpen: boolean;
  onToggleDialog: () => void;
  selectedEmergency: Emergency | null;
}

type EmergencySchema = {
  id: string;
  status: string;
  name: string;
  contact: string;
  report: string;
  emergencyType: string;
  date: {
    seconds: number;
  };
  location: {
    latitude: number;
    longitude: number;
  };
};

const EmergencyDetailDialog: React.FC<EmergencyDetailDialogProps> = () => {
  const [emergencyReport, setEmergencyReport] = React.useState<string>("");
  const { isDialogOpen, toggleDialog, updateEmergency, isLoading, selectedEmergency } =
    useContext(EmergencyContext);

  const data: EmergencySchema = {
    id: selectedEmergency?.id || "",
    status: selectedEmergency?.status || "",
    name: selectedEmergency?.name || "",
    report: selectedEmergency?.report || "",
    emergencyType: selectedEmergency?.emergencyType || "",
    contact: selectedEmergency?.phone || "",
    date: selectedEmergency?.date || {
      seconds: 0,
    },
    location: selectedEmergency?.location || { latitude: 0, longitude: 0 },
  };

  const date = new Date(data.date.seconds * 1000);
  const handleReport = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmergencyReport(event.target.value);
  };

  const googleMapsUrl = `http://maps.google.com/maps?q=${data.location.latitude}&ll=${data.location.longitude}&z=17`;

  return (
    <AlertDialog open={isDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <h1>Detaille de signalement</h1>
       
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div>
              <span className="font-bold text-lg">Nom :</span>
              <span> {data.name}</span>
            </div>
            <div>
              <span className="font-bold text-lg">Contact :</span>
              <span> {data.contact}</span>
            </div>
            <div>
              <span className="font-bold text-lg">Type :</span>
              <span> {data.emergencyType}</span>
            </div>
            <div>
              <span className="font-bold text-lg">Date :</span>
              <span> {formatDate(date)}</span>
            </div>
            <div>
              <span className="font-bold text-lg">Statut :</span>
              <span> {data.status}</span>
            </div>
            <div>
              <span className="font-bold text-lg">Localisation :</span>
              <div>
                <span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700 mb-4 "
                >
                  Voir sur Google Maps
                </a></span>
              </div>
            </div>
            {data.status !== "Traitee" ? (
              <div className="mt-8"><Textarea value={emergencyReport} onChange={handleReport} placeholder="Ecrivez votre rapport sur l'urgence." /></div>
            ) : (
              <div>{data.report}</div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {data.status !== "Traitee" ? (
            <AlertDialogAction
              disabled={isLoading}
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => updateEmergency({ id: data.id, report: emergencyReport })}
            >
              Mettre à jour
            </AlertDialogAction>
          ) : null}
          <AlertDialogAction onClick={() => toggleDialog(null)}>Fermer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmergencyDetailDialog;
