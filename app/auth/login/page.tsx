"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { auth } from "@/firebase/firebaseonfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    email: z.string().email({ message: "Veuillez saisir une adresse e-mail valide" }),
    password: z
      .string()
      .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
  })
  .required();

  
  export default function LoginForm() {
    const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (result?.error) {
        console.error("Error during sign in:", result.error); // Ajoutez ceci pour capturer les erreurs
      }else{
        router.push("/");
      }
      return result;
    } catch (error) {
      console.error("Error during sign in:", error); // Ajoutez ceci pour capturer les erreurs
    }
  }
  
  
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
    },
  })

  return (
    <div className="bg-blue-500 flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Entrez votre adresse email ici" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Mot de passe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        <div className="flex justify-center">
            <Button type="submit" className="w-64 bg-blue-700 hover:bg-blue-800">Se connecter</Button>
        </div>
      </form>
    </Form>
    </div>
    </div>
  )
}
