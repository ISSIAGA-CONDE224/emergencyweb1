"use client"
import { collection, getDocs } from "firebase/firestore";
import Layout from "../components/Layout";
import { db } from "@/lib/firebase/firebase-config";
import { useEffect } from "react";


async function getHistory() {
  const histories = collection(db, "emergencies");
  const historiesSnapshot = await getDocs(histories);
  const historiesList = historiesSnapshot.docs.map((doc) => doc.data());
  return historiesList
}
export default function Home() {
  useEffect(() => {
    console.log(getHistory())
  }, [])
  return <Layout>Home</Layout>;
}