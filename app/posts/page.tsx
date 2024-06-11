"use client"
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import EmergencyDetailDialog from '@/components/emergency/EmergencyDetailDialog';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import {db} from "@/firebase/firebaseonfig"
import { Emergency, columns } from '@/components/emergency/columns';
import { DataTable } from '@/components/emergency/data-table';
import { EmergencyContext, EmergencyProvider } from '@/lib/contexts/emergencyContext';
import { where } from 'firebase/firestore';



async function getEmergencyData(): Promise<Emergency[]> {
  const q = query(collection(db, "emergencies"), where("isTreat", "==", false),orderBy("createdAt", "asc"));
      const querySnapshot = await getDocs(q);
      const dataArray : Emergency[] = [];
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
        phone: doc.data().phone
      }         
        dataArray.push(emergency);
      });
  return dataArray
  
}
const Posts =  async () => {
  const {selectedEmergency,isDialogOpen,toggleDialog} = useContext(EmergencyContext)
  useEffect(() => {
  }, [isDialogOpen])
  const data = await getEmergencyData()
  return (
    <Layout>
      <EmergencyProvider>
      <EmergencyDetailDialog initialIsOpen={isDialogOpen} onToggleDialog={() => toggleDialog(null)} selectedEmergency={selectedEmergency} />
      <DataTable columns={columns} data={data} />
      </EmergencyProvider>
    </Layout>
  );
};

export default Posts;
