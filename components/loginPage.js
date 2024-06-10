// "use client"; // Ajoutez cette ligne en haut du fichier

// import { useState } from 'react';
// import styles from './Login.module.css';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle login logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//   };

//   return (
//     <div className={styles.container}>
//       <h1>Connexion</h1>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.inputGroup}>
//           <label htmlFor="email">Adresse Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className={styles.input}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor="password">Mot de Passe</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className={styles.input}
//           />
//         </div>
//         <button type="submit" className={styles.button}>Connexion</button>
//       </form>
//     </div>
//   );
// }


"use client"; // Ajoutez cette ligne en haut du fichier

import { useState } from 'react';

import styles from './Login.module.css';
import { useRouter } from 'next/router';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 //const router = useRouter(); // Initialiser useRouter

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);

    // Rediriger vers la page Sidebar après la connexion réussie
    router.replace('/');
  };

  return (
    <div className={styles.container}>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Adresse Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Mot de Passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Connexion</button>
      </form>
    </div>
  );
}
