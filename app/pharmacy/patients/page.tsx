"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { Search, Phone, Mail, MapPin, User } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dummy data
const patients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    address: "123 Main St, City, State 12345",
    lastOrder: "2025-05-28",
    totalOrders: 5,
    prescriptions: [
      { id: 1, date: "2025-05-28", status: "pending", items: 2 },
      { id: 2, date: "2025-04-15", status: "completed", items: 3 },
      { id: 3, date: "2025-03-02", status: "completed", items: 1 },
    ],
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8901",
    address: "456 Oak Ave, City, State 12345",
    lastOrder: "2025-05-27",
    totalOrders: 3,
    prescriptions: [
      { id: 4, date: "2025-05-27", status: "pending", items: 2 },
      { id: 5, date: "2025-02-18", status: "completed", items: 2 },
    ],
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 234-567-8902",
    address: "789 Pine St, City, State 12345",
    lastOrder: "2025-05-26",
    totalOrders: 8,
    prescriptions: [
      { id: 6, date: "2025-05-26", status: "quoted", items: 1 },
      { id: 7, date: "2025-04-20", status: "completed", items: 4 },
      { id: 8, date: "2025-03-15", status: "completed", items: 2 },
      { id: 9, date: "2025-02-10", status: "completed", items: 1 },
    ],
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 234-567-8903",
    address: "101 Elm St, City, State 12345",
    lastOrder: "2025-05-25",
    totalOrders: 4,
    prescriptions: [
      { id: 10, date: "2025-05-25", status: "completed", items: 2 },
      { id: 11, date: "2025-04-10", status: "completed", items: 3 },
    ],
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.brown@example.com",
    phone: "+1 234-567-8904",
    address: "202 Maple Ave, City, State 12345",
    lastOrder: "2025-05-24",
    totalOrders: 2,
    prescriptions: [
      { id: 12, date: "2025-05-24", status: "completed", items: 1 },
      { id: 13, date: "2025-03-05", status: "completed", items: 2 },
    ],
  },
]

type Patient = typeof patients[number];

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600"
      case "quoted":
        return "text-blue-600"
      case "completed":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage patient information</p>
      </header>
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search patients by name, email, or phone..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="grid gap-4">
        {filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No patients found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{patient.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {patient.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {patient.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Last Order</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(patient.lastOrder).toLocaleDateString()}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                          View Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Patient Profile</DialogTitle>
                          <DialogDescription>Detailed information about {patient.name}</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Patient Information */}
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="text-lg">
                                {patient.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{patient.name}</h2>
                              <p className="text-gray-600 dark:text-gray-400">Patient ID: {patient.id}</p>
                            </div>
                          </div>

                          {/* Contact Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{patient.email}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3">
                              <Phone className="w-5 h-5 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{patient.phone}</p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-3 col-span-2">
                              <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">{patient.address}</p>
                              </div>
                            </div>
                          </div>

                          {/* Order History */}
                          <div>
                            <Tabs defaultValue="prescriptions">
                              <TabsList>
                                <TabsTrigger value="prescriptions">Prescription History</TabsTrigger>
                                <TabsTrigger value="notes">Notes</TabsTrigger>
                              </TabsList>
                              <TabsContent value="prescriptions" className="pt-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>ID</TableHead>
                                      <TableHead>Date</TableHead>
                                      <TableHead>Items</TableHead>
                                      <TableHead>Status</TableHead>
                                      <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {patient.prescriptions.map((prescription) => (
                                      <TableRow key={prescription.id}>
                                        <TableCell className="font-medium">#{prescription.id}</TableCell>
                                        <TableCell>{new Date(prescription.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{prescription.items}</TableCell>
                                        <TableCell>
                                          <span className={getStatusColor(prescription.status)}>
                                            {prescription.status.charAt(0).toUpperCase() +
                                              prescription.status.slice(1)}
                                          </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                          <Button variant="outline" size="sm">
                                            View
                                          </Button>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TabsContent>
                              <TabsContent value="notes" className="pt-4">
                                <Card>
                                  <CardContent className="p-4">
                                    <p className="text-gray-600 dark:text-gray-400 italic">
                                      No notes available for this patient.
                                    </p>
                                  </CardContent>
                                </Card>
                              </TabsContent>
                            </Tabs>
                          </div>

                          {/* Summary */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Card>
                              <CardContent className="p-4">
                                <p className="text-sm text-gray-500">Total Orders</p>
                                <p className="text-xl font-bold">{patient.totalOrders}</p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <p className="text-sm text-gray-500">Last Order</p>
                                <p className="text-xl font-bold">
                                  {new Date(patient.lastOrder).toLocaleDateString()}
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <p className="text-sm text-gray-500">Active Prescriptions</p>
                                <p className="text-xl font-bold">
                                  {patient.prescriptions.filter((p) => p.status !== "completed").length}
                                </p>
                              </CardContent>
                            </Card>
                            <Card>
                              <CardContent className="p-4">
                                <p className="text-sm text-gray-500">Customer Since</p>
                                <p className="text-xl font-bold">
                                  {new Date(
                                    patient.prescriptions.sort(
                                      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
                                    )[0].date,
                                  ).toLocaleDateString()}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
