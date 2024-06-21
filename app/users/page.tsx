'use client'
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { Emergency, columns } from "@/components/emergency/columns";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebaseonfig";
import { DataTable } from "@/components/emergency/data-table";
import { EmergencyContext, EmergencyProvider } from "@/lib/contexts/emergencyContext";
import EmergencyDetailDialog from "@/components/emergency/EmergencyDetailDialog";

export async function getEmergencyData(): Promise<Emergency[]> {
  const q = query(collection(db, "emergencies"), where("isTreat", "==", true), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const dataArray: Emergency[] = [];
  querySnapshot.forEach((doc) => {
    const Emergency: Emergency = {

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
      location:doc.data().location,
    }
    dataArray.push(Emergency);
  });
  return dataArray
}


export async function getEmergencynottreaData(): Promise<Emergency[]> {
  const q = query(collection(db, "emergencies"), where("isTreat", "==", false), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const dataArray: Emergency[] = [];
  querySnapshot.forEach((doc) => {
    const Emergency: Emergency = {

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
      location:doc.data().location,
    }
    dataArray.push(Emergency);
  });
  return dataArray
}

const Users = async () => {
  const { selectedEmergency, isDialogOpen, toggleDialog } = useContext(EmergencyContext);
  const data = await getEmergencyData();
  return (
    <EmergencyProvider>
      <Layout>
        <h1 className="text-black text-lg mb-4 font-bold">La liste des urgences traitées</h1> {/* Texte en gras ajouté ici */}
        <EmergencyDetailDialog initialIsOpen={isDialogOpen} onToggleDialog={() => toggleDialog(null)} selectedEmergency={selectedEmergency} />
        <DataTable columns={columns} data={data} />
      </Layout>
    </EmergencyProvider>
  );
};

export default Users;
