"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, FileText, Clock, CheckCircle, Bell, Plus } from "lucide-react"
import { UserSidebar } from "@/components/user-sidebar"

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
      <UserSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your prescriptions and quotations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="icon" variant="ghost">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Upload className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Uploads</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quotations</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="flex space-x-4">
              <Link href="/user/upload">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Upload Prescription
                </Button>
              </Link>
              <Link href="/user/quotations">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View Quotations
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Prescriptions</h2>
            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <Badge className={getStatusColor(prescription.status)}>
                            {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
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
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {prescription.quotations.length > 0 && <Button size="sm">View Quotations</Button>}
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
