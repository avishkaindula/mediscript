"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { FileText, Search, Filter, Eye, Send } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import Link from "next/link"

// Dummy data
const prescriptions = [
  {
    id: 1,
    patientName: "John Doe",
    uploadDate: "2024-05-28",
    status: "pending",
    images: 3,
    note: "Urgent - needed for tonight",
    deliveryAddress: "123 Main St, City",
    deliveryTime: "6:00 PM - 8:00 PM",
    phone: "+1 234-567-8900",
    hasQuotation: false,
  },
  {
    id: 2,
    patientName: "Jane Smith",
    uploadDate: "2024-05-27",
    status: "pending",
    images: 2,
    note: "Regular medication refill",
    deliveryAddress: "456 Oak Ave, City",
    deliveryTime: "2:00 PM - 4:00 PM",
    phone: "+1 234-567-8901",
    hasQuotation: false,
  },
  {
    id: 3,
    patientName: "Mike Johnson",
    uploadDate: "2024-05-26",
    status: "quoted",
    images: 1,
    note: "Blood pressure medication",
    deliveryAddress: "789 Pine St, City",
    deliveryTime: "10:00 AM - 12:00 PM",
    phone: "+1 234-567-8902",
    hasQuotation: true,
  },
  {
    id: 4,
    patientName: "Sarah Williams",
    uploadDate: "2024-05-25",
    status: "completed",
    images: 2,
    note: "Monthly diabetes medication",
    deliveryAddress: "101 Elm St, City",
    deliveryTime: "12:00 PM - 2:00 PM",
    phone: "+1 234-567-8903",
    hasQuotation: true,
  },
  {
    id: 5,
    patientName: "Robert Brown",
    uploadDate: "2024-05-24",
    status: "completed",
    images: 1,
    note: "Allergy medication",
    deliveryAddress: "202 Maple Ave, City",
    deliveryTime: "4:00 PM - 6:00 PM",
    phone: "+1 234-567-8904",
    hasQuotation: true,
  },
]

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPrescription, setSelectedPrescription] = useState(null)

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.note.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || prescription.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "quoted":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Prescriptions</h1>
        <p className="text-gray-600 dark:text-gray-400">View and manage all patient prescriptions</p>
      </header>
      {/* Filters and Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search prescriptions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter by Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="quoted">Quoted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Prescriptions List */}
      <div className="grid gap-4">
        {filteredPrescriptions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No prescriptions found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <Card key={prescription.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{prescription.patientName}</h3>
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {new Date(prescription.uploadDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white mb-1">{prescription.note}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {prescription.images} images • Delivery: {prescription.deliveryTime}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {prescription.deliveryAddress} • {prescription.phone}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Prescription Details - {prescription.patientName}</DialogTitle>
                          <DialogDescription>Review prescription details</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Prescription Images */}
                          <div>
                            <h3 className="font-semibold mb-4">Prescription Images</h3>
                            <div className="space-y-4">
                              <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-500">Main Prescription</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-4 gap-2">
                                {Array.from({ length: prescription.images - 1 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="aspect-square bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center"
                                  >
                                    <FileText className="w-6 h-6 text-gray-400" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Patient Information */}
                          <div>
                            <h3 className="font-semibold mb-4">Patient Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{prescription.patientName}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{prescription.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Delivery Address</p>
                                <p className="font-medium">{prescription.deliveryAddress}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Delivery Time</p>
                                <p className="font-medium">{prescription.deliveryTime}</p>
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          <div>
                            <h3 className="font-semibold mb-2">Patient Notes</h3>
                            <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              {prescription.note}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end space-x-3">
                            {!prescription.hasQuotation && prescription.status === "pending" && (
                              <Link href={`/pharmacy/create-quote/${prescription.id}`}>
                                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                                  <Send className="w-4 h-4 mr-2" />
                                  Create Quotation
                                </Button>
                              </Link>
                            )}
                            {prescription.hasQuotation && <Button variant="outline">View Quotation</Button>}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {!prescription.hasQuotation && prescription.status === "pending" && (
                      <Link href={`/pharmacy/create-quote/${prescription.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Quote
                        </Button>
                      </Link>
                    )}
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
