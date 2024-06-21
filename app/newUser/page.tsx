"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Layout from "../../components/Layout";
import { createUserWithRole } from "../auth/login/auth";


const CreateAccount: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  const { name, email, password, role } = formData;
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
    setError(null); // Reset the error message
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setIsLoading(true); // Set loading state to true when form is submitted

    try {
      const user = await createUserWithRole(email, password, name, role);
      console.log("User created:", user);
      resetForm(); // Reset the form fields after successful account creation
      setIsLoading(false); // Reset loading state after user creation
    } catch (err: any) {
      console.error("Error creating user:", err.message);
      setError("Erreur lors de la création de l'utilisateur.");
      setIsLoading(false); // Reset loading state on error
    }
  };

  return (
    <Layout>
      <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl mb-4 text-black">Créer un compte</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="text-black">Nom</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-black">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
            autoComplete="off"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-black">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded text-black pr-10"
              autoComplete="new-password"
              required
            />
            <span
              className="absolute top-2 right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.425 8.274a4 4 0 10-5.65 5.65l.707.707a5 5 0 017.07 0l.707-.707a4 4 0 000-5.65l-.707-.707zM12 15a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-black">Rôle</label>
          <select
            name="role"
            value={role}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded text-black"
          >
            <option value="user">Admin</option>
            <option value="police">Accident de la route</option>
            <option value="user">Urgence médicale</option>
            <option value="firefighter">Catastrophe naturelle</option>
            <option value="plumber">Crime</option>
            <option value="plumber">Incendie</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v4m0 8v4m8-8h-4M4 12H0m16.24-5.64l-2.83 2.83m0 7.78l-2.83 2.83M7.76 7.76L4.93 4.93m0 14.14l2.83-2.83"
              />
            </svg>
          ) : (
            "Créer un compte"
          )}
        </button>
      </form>
    </Layout>
  );
};

export default CreateAccount;
