"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, FileText, Clock, CheckCircle, Bell, Plus, Eye, Menu } from "lucide-react"
import { UserSidebar } from "@/components/user-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
]

export default function UserDashboard() {
  const [selectedPrescription, setSelectedPrescription] = useState(null)

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
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <UserSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64 h-full">
                  <UserSidebar />
                </SheetContent>
              </Sheet>

              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 hidden sm:block">
                  Manage your prescriptions and quotations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button size="icon" variant="ghost">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar className="w-8 h-8 md:w-10 md:h-10">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center">
                  <Upload className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Uploads</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Quotations</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-yellow-600" />
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
                  <div className="ml-3 md:ml-4">
                    <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Link href="/user/upload" className="flex-1 sm:flex-none">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Prescription
                </Button>
              </Link>
              <Link href="/user/quotations" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full sm:w-auto">
                  <FileText className="w-4 h-4 mr-2" />
                  View Quotations
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Prescriptions</h2>
              <Link href="/user/prescriptions">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                          <Badge className={getStatusColor(prescription.status)}>
                            {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Uploaded on {new Date(prescription.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-900 dark:text-white font-medium mb-1 truncate">{prescription.note}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {prescription.images} images • Delivery: {prescription.deliveryTime}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {prescription.deliveryAddress}
                        </p>
                        {prescription.quotations.length > 0 && (
                          <p className="text-sm text-blue-600 mt-2">
                            {prescription.quotations.length} quotation(s) received
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full sm:w-auto">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {prescription.quotations.length > 0 && (
                          <Link href="/user/quotations" className="w-full sm:w-auto">
                            <Button size="sm" className="w-full">
                              View Quotations
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
