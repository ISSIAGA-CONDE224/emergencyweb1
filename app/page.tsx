'use client'
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import { redirect } from 'next/navigation'

export default function Home() {
  // verifie si l'utilisateur a une session
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/auth/login')
    }
})
console.log(session)
  
  return <Layout>Home</Layout>;
}