import { ColumnDef } from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { useContext } from "react";
import { EmergencyContext } from "@/lib/contexts/emergencyContext";
import { formatDate } from "@/lib/dateFormat";

export type Emergency = {
    id: string;
    status: string;
    name: string
    emergencyType: string;
    report: string;
    date: {
        seconds: number
    };
    description: string;
    imageUrl: string;
    isTreated: string;
    phone: string;
    location:  {
        latitude: 0,
        longitude: 0,
      },
};

export const columns:ColumnDef<Emergency>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({row}) => {
            const emergency = row.original
            const isTreat = emergency.isTreated
            
            return<div className={isTreat ? 'text-green-500 text-lg font-bold' : 'text-red-500 text-lg font-bold'} >{isTreat ? 'Traitee' : 'En Attente'}</div> 
        }
    },
    {
        accessorKey: 'name',
        header: 'Nom',
    },
    {
        accessorKey: 'emergencyType',
        header: 'Type de l\'urgence',
    },
    {
        accessorKey: 'phone',
        header: 'Contact',
    },
    {
        accessorKey: 'emergencyType',
        header: 'Type',
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
        cell: ({row}) => {
            const emergency = row.original;
            const date = new Date(emergency.date.seconds * 1000);
            const formattedDate = formatDate(date);
            return formattedDate
        }
    },
    {
        id: 'actions',
        cell: ({row}) => {
            const emergency = row.original
            const {toggleDialog} = useContext(EmergencyContext)
            return <DropdownMenu>
                 <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {toggleDialog(emergency)}}>Voir details d'urngence</DropdownMenuItem>
          </DropdownMenuContent>
            </DropdownMenu>
        },
    }
]