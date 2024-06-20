import React, { createContext, useState } from "react";

export const EmergencyContext = createContext();

export const EmergencyProvider = ({ children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDialog = (emergency) => {
    setSelectedEmergency(emergency);
    setIsDialogOpen(!isDialogOpen);
  };

  const updateEmergency = async ({ id, report }) => {
    setIsLoading(true);
    try {
      // Simulez la mise à jour de l'urgence dans votre base de données
      console.log(`Updating emergency ${id} with report: ${report}`);
      // Mettre à jour l'état ou rafraîchir les données après la mise à jour
    } catch (error) {
      console.error("Failed to update emergency", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EmergencyContext.Provider
      value={{ isDialogOpen, toggleDialog, updateEmergency, isLoading, selectedEmergency }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};
