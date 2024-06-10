"use client"
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import './Posts.css';  // Assurez-vous d'importer le fichier CSS
import EmergencyDetailDialog from '@/components/EmergencyDetailDialog';
import { collection, getDocs } from 'firebase/firestore';
import {db} from "@/firebase/firebaseonfig"

const postsData = [
  { status: 'En attente', name: 'John Doe', Contact: '622020102', emergencyType: 'Incendie', date: '2024-06-10' },
  { status: 'En cours', name: 'Jane Smith',Contact: '660020103', emergencyType: 'Inondation', date: '2024-06-09' },
  { status: 'Résolu', name: 'Will Johnson',Contact: '612020000', emergencyType: 'Séisme', date: '2024-06-08' },
  { status: 'En attente', name: 'Anna Brown', Contact: '620020102',emergencyType: 'Accident', date: '2024-06-07' },
];



const Posts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Début de la récupération des données...");
        const querySnapshot = await getDocs(collection(db, 'emergencies'));
        const dataArray :any = [];
        querySnapshot.forEach((doc) => {
          dataArray.push({ id: doc.id, ...doc.data() });
        });
        setData(dataArray);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        //setError(error);8
      }
    };

    fetchData();
  }, []);


  const toggleDialog = () => {
    
    setIsOpen((prevState) => !prevState);
    console.log(isOpen)
  };
  return (
    <Layout>
      <EmergencyDetailDialog initialIsOpen={isOpen} onToggleDialog={toggleDialog}  />
      <h1>Signalement</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Statut</th>
            <th>Nom</th>
            <th>Contact</th>
            <th>Type d'urgence</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((post, index) =>{
            console.log(post)
            return  <tr key={index} className='hover:cursor-pointer' onClick={toggleDialog}>
            <td>{post}</td>
          </tr>
          } 
            
           
            
          )}
        </tbody>
      </table>
    </Layout>
  );
};

export default Posts;
