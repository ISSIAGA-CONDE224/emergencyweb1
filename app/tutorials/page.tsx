// 'use client'

// import React, { useEffect, useState } from "react";
// import Layout from "../../components/Layout";
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { getEmergencyData } from "../users/page";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const EmergencyStats = () => {
//   const [treatedData, setTreatedData] = useState({
//     labels: [] as string[],
//     datasets: [
//       {
//         label: 'Nombre d\'urgences traitées',
//         data: [] as number[],
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//     ],
//   });

//   const [untreatedData, setUntreatedData] = useState({
//     labels: [] as string[],
//     datasets: [
//       {
//         label: 'Nombre d\'urgences non traitées',
//         data: [] as number[],
//         backgroundColor: 'rgba(255, 99, 132, 0.2)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   });

//   useEffect(() => {
//     async function fetchData() {
//       const emergencyData = await getEmergencyData();
      
//       const treatedStats = emergencyData.filter(e => e.isTreated).reduce((acc, emergency) => {
//         const type = emergency.emergencyType;
//         if (acc[type]) {
//           acc[type]++;
//         } else {
//           acc[type] = 1;
//         }
//         return acc;
//       }, {} as { [key: string]: number });

//       const untreatedStats = emergencyData.filter(e => !e.isTreated).reduce((acc, emergency) => {
//         const type = emergency.emergencyType;
//         if (acc[type]) {
//           acc[type]++;
//         } else {
//           acc[type] = 1;
//         }
//         return acc;
//       }, {} as { [key: string]: number });

//       setTreatedData({
//         labels: Object.keys(treatedStats),
//         datasets: [
//           {
//             label: 'Nombre d\'urgences traitées',
//             data: Object.values(treatedStats),
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//           },
//         ],
//       });

//       setUntreatedData({
//         labels: Object.keys(untreatedStats),
//         datasets: [
//           {
//             label: 'Nombre d\'urgences non traitées',
//             data: Object.values(untreatedStats),
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1,
//           },
//         ],
//       });
//     }

//     fetchData();
//   }, []);

//   return (
//     <Layout>
//       <h1 className="text-black text-lg mb-4 font-bold">Statistiques des urgences</h1>
//       <div className="flex space-x-8">
//         <div className="w-1/2">
//           <Bar 
//             data={treatedData} 
//             options={{ 
//               responsive: true, 
//               plugins: { 
//                 legend: { position: 'top' }, 
//                 title: { display: true, text: 'Urgences traitées' } 
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Types d\'urgences'
//                   }
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'Nombre d\'urgences'
//                   }
//                 }
//               }
//             }} 
//           />
//         </div>
//         <div className="w-1/2">
//           <Bar 
//             data={untreatedData} 
//             options={{ 
//               responsive: true, 
//               plugins: { 
//                 legend: { position: 'top' }, 
//                 title: { display: true, text: 'Urgences non traitées' } 
//               },
//               scales: {
//                 x: {
//                   title: {
//                     display: true,
//                     text: 'Types d\'urgences'
//                   }
//                 },
//                 y: {
//                   title: {
//                     display: true,
//                     text: 'Nombre d\'urgences'
//                   }
//                 }
//               }
//             }} 
//           />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default EmergencyStats;
'use client'
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getEmergencyData } from "../users/page";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmergencyStats = () => {
  const [treatedData, setTreatedData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Nombre d\'urgences traitées',
        data: [] as number[],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [pendingData, setPendingData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Nombre d\'urgences en attente',
        data: [] as number[],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  });

  const [reportedData, setReportedData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Nombre de signalements',
        data: [] as number[],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      const emergencyData = await getEmergencyData();
      
      const treatedStats = emergencyData.filter(e => e.isTreated).reduce((acc, emergency) => {
        const type = emergency.emergencyType;
        if (acc[type]) {
          acc[type]++;
        } else {
          acc[type] = 1;
        }
        return acc;
      }, {} as { [key: string]: number });

      setTreatedData({
        labels: Object.keys(treatedStats),
        datasets: [
          {
            label: 'Nombre d\'urgences traitées',
            data: Object.values(treatedStats),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });

      const pendingStats = emergencyData.filter(e => !e.isTreated).reduce((acc, emergency) => {
        const type = emergency.emergencyType;

        if (acc[type]) {
          acc[type]++;
        } else {
          acc[type] = 1;
        }
        return acc;
      }, {} as { [key: string]: number });

      setPendingData({
        labels: Object.keys(pendingStats),
        datasets: [
          {
            label: 'Nombre d\'urgences en attente',
            data: Object.values(pendingStats),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      });

      const reportedStats = emergencyData.reduce((acc, emergency) => {
        const type = emergency.emergencyType;
        if (acc[type]) {
          acc[type]++;
        } else {
          acc[type] = 1;
        }
        return acc;
      }, {} as { [key: string]: number });

      const sortedReportedStats = Object.keys(reportedStats).sort((a, b) => reportedStats[b] - reportedStats[a]);

      setReportedData({
        labels: sortedReportedStats,
        datasets: [
          {
            label: 'Nombre de signalements',
            data: sortedReportedStats.map(type => reportedStats[type]),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      });
    }

    fetchData();
  }, []);
console.log('bonjour 🤦‍♀️🤣🤷‍♀️😍',pendingData);
  return (
    <Layout>
      <h1 className="text-black text-lg mb-4 font-bold">Statistiques des urgences traitées, en attente, et des signalements</h1>
      <div className="w-full mb-8">
        <Bar 
          data={treatedData} 
          options={{ 
            responsive: true, 
            plugins: { 
              legend: { position: 'top' }, 
              title: { display: true, text: 'Urgences traitées' } 
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Types d\'urgences'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Nombre d\'urgences'
                }
              }
            }
          }} 
        />
      </div>
      <div className="w-full mb-8">
        <Bar 
          data={pendingData} 
          options={{ 
            responsive: true, 
            plugins: { 
              legend: { position: 'top' }, 
              title: { display: true, text: 'Urgences en attente' } 
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Types d\'urgences'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Nombre d\'urgences'
                }
              }
            }
          }} 
        />
      </div>
      <div className="w-full">
        <Bar 
          data={reportedData} 
          options={{ 
            responsive: true, 
            plugins: { 
              legend: { position: 'top' }, 
              title: { display: true, text: 'Signalements par type' } 
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Types de signalements'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Nombre de signalements'
                }
              }
            }
          }} 
        />
      </div>
    </Layout>
  );
};

export default EmergencyStats;
