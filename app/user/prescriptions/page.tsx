"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserSidebar } from "@/components/user-sidebar"
import { FileText, Search, Filter, Eye, Clock, CheckCircle } from "lucide-react"
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
    uploadDate: "2024-05-28",
    status: "pending",
    images: 3,
    note: "Urgent - needed for tonight",
    deliveryAddress: "123 Main St, City",
    deliveryTime: "6:00 PM - 8:00 PM",
    quotations: [],
  },
  {
    id: 2,
    uploadDate: "2024-05-27",
    status: "quoted",
    images: 2,
    note: "Regular medication refill",
    deliveryAddress: "123 Main St, City",
    deliveryTime: "2:00 PM - 4:00 PM",
    quotations: [
      {
        id: 1,
        pharmacyName: "Green Valley Pharmacy",
        total: 75.0,
        status: "pending",
        items: [
          { drug: "Amoxicillin 250mg", quantity: "10.00 x 5", amount: 50.0 },
          { drug: "Paracetamol 500mg", quantity: "5.00 x 5", amount: 25.0 },
        ],
      },
    ],
  },
  {
    id: 3,
    uploadDate: "2024-05-25",
    status: "completed",
    images: 1,
    note: "Blood pressure medication",
    deliveryAddress: "123 Main St, City",
    deliveryTime: "10:00 AM - 12:00 PM",
    quotations: [
      {
        id: 2,
        pharmacyName: "City Care Pharmacy",
        total: 45.0,
        status: "accepted",
        items: [{ drug: "Lisinopril 10mg", quantity: "30 tablets", amount: 45.0 }],
      },
    ],
  },
  {
    id: 4,
    uploadDate: "2024-05-20",
    status: "completed",
    images: 2,
    note: "Allergy medication",
    deliveryAddress: "123 Main St, City",
    deliveryTime: "2:00 PM - 4:00 PM",
    quotations: [
      {
        id: 3,
        pharmacyName: "Health Plus Pharmacy",
        total: 35.0,
        status: "accepted",
        items: [
          { drug: "Cetirizine 10mg", quantity: "30 tablets", amount: 15.0 },
          { drug: "Fluticasone Nasal Spray", quantity: "1 bottle", amount: 20.0 },
        ],
      },
    ],
  },
  {
    id: 5,
    uploadDate: "2024-05-15",
    status: "completed",
    images: 1,
    note: "Monthly diabetes medication",
    deliveryAddress: "123 Main St, City",
    deliveryTime: "10:00 AM - 12:00 PM",
    quotations: [
      {
        id: 4,
        pharmacyName: "MediCare Pharmacy",
        total: 120.0,
        status: "accepted",
        items: [
          { drug: "Metformin 500mg", quantity: "60 tablets", amount: 40.0 },
          { drug: "Insulin Glargine", quantity: "1 vial", amount: 80.0 },
        ],
      },
    ],
  },
]

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch = prescription.note.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || prescription.status === selectedStatus
    const matchesTab = activeTab === "all" || prescription.status === activeTab
    return matchesSearch && matchesStatus && matchesTab
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 mr-1" />
      case "quoted":
        return <FileText className="w-4 h-4 mr-1" />
      case "completed":
        return <CheckCircle className="w-4 h-4 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <UserSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Prescriptions</h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage all your prescription uploads</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
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
          <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="quoted">Quoted</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Quick Action */}
          <div className="mb-6">
            <Link href="/user/upload">
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Upload New Prescription
              </Button>
            </Link>
          </div>

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
                          <Badge className={getStatusColor(prescription.status)}>
                            <div className="flex items-center">
                              {getStatusIcon(prescription.status)}
                              <span>{prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}</span>
                            </div>
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Uploaded on {new Date(prescription.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium mb-1">{prescription.note}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {prescription.images} images • Delivery: {prescription.deliveryTime}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.deliveryAddress}</p>
                        {prescription.quotations.length > 0 && (
                          <p className="text-sm text-blue-600 mt-2">
                            {prescription.quotations.length} quotation(s) received
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Prescription Details</DialogTitle>
                              <DialogDescription>
                                Uploaded on {new Date(prescription.uploadDate).toLocaleDateString()}
                              </DialogDescription>
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

                              {/* Prescription Details */}
                              <div>
                                <h3 className="font-semibold mb-4">Details</h3>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <Badge className={getStatusColor(prescription.status)}>
                                      {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Upload Date</p>
                                    <p className="font-medium">
                                      {new Date(prescription.uploadDate).toLocaleDateString()}
                                    </p>
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
                                <h3 className="font-semibold mb-2">Notes</h3>
                                <p className="text-gray-600 dark:text-gray-400 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  {prescription.note}
                                </p>
                              </div>

                              {/* Quotations */}
                              {prescription.quotations.length > 0 && (
                                <div>
                                  <h3 className="font-semibold mb-4">Quotations</h3>
                                  <div className="space-y-4">
                                    {prescription.quotations.map((quotation) => (
                                      <Card key={quotation.id}>
                                        <CardContent className="p-4">
                                          <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium">{quotation.pharmacyName}</h4>
                                            <p className="font-bold">${quotation.total.toFixed(2)}</p>
                                          </div>
                                          <div className="space-y-2">
                                            {quotation.items.map((item, index) => (
                                              <div
                                                key={index}
                                                className="flex justify-between text-sm text-gray-600 dark:text-gray-400"
                                              >
                                                <span>
                                                  {item.drug} ({item.quantity})
                                                </span>
                                                <span>${item.amount.toFixed(2)}</span>
                                              </div>
                                            ))}
                                          </div>
                                          <div className="mt-4 flex justify-end space-x-2">
                                            <Link href={`/user/quotations`}>
                                              <Button size="sm">View Full Quotation</Button>
                                            </Link>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex justify-end space-x-3">
                                {prescription.status === "pending" && (
                                  <Button variant="outline" size="sm">
                                    Cancel Prescription
                                  </Button>
                                )}
                                {prescription.quotations.length > 0 && (
                                  <Link href="/user/quotations">
                                    <Button size="sm">View All Quotations</Button>
                                  </Link>
                                )}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {prescription.quotations.length > 0 && (
                          <Link href="/user/quotations">
                            <Button size="sm">View Quotations</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
