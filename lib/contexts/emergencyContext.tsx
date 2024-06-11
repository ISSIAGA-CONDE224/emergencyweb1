import { Emergency } from "@/components/emergency/columns";
import { db } from "@/firebase/firebaseonfig";
import {  doc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";

interface EmergencyContextValue {
    isDialogOpen: boolean;
    isLoading: boolean;
    selectedEmergency: Emergency | null;
    toggleDialog: (emergency: Emergency | null) => void;
    updateEmergency: (emergency: {id: string, report: string} | null) => Promise<{id: string, report: string} | null>;
  }
  export const EmergencyContext = createContext<EmergencyContextValue>({
    isDialogOpen: false,
    isLoading: false,
    selectedEmergency: null,
    toggleDialog: () => {},
    updateEmergency: async () => {return null}
  });

  export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
    const toggleDialog = (emergency: Emergency | null) => {
      setIsDialogOpen(!isDialogOpen);
      setSelectedEmergency(emergency);
    };

    const updateEmergency = async (emergency: {id: string, report: string} | null)=> {
     if(emergency){
        setIsLoading(true)
        const emergencyRef = doc(db, "emergencies", emergency.id);
        await updateDoc(emergencyRef, {isTreat: true,report: emergency.report});
      setIsLoading(false)
      setIsDialogOpen(false);
      setSelectedEmergency(null);
      }
      return emergency
    }
  
    const value: EmergencyContextValue = {
      isDialogOpen,
      isLoading,
      selectedEmergency,
      toggleDialog,
      updateEmergency
    };
  
    return <EmergencyContext.Provider value={value}>{children}</EmergencyContext.Provider>;
  };