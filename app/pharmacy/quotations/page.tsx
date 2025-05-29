"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { FileText, Search, Filter, Eye, Clock, CheckCircle, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

// Dummy data
const quotations = [
  {
    id: 1,
    prescriptionId: 3,
    patientName: "Mike Johnson",
    createdDate: "2024-05-26",
    expiryDate: "2024-05-31",
    status: "pending",
    total: 65.0,
    items: [
      { drug: "Lisinopril 10mg", quantity: "30 tablets", amount: 40.0 },
      { drug: "Aspirin 81mg", quantity: "90 tablets", amount: 25.0 },
    ],
    deliveryFee: 5.0,
    estimatedDelivery: "2-3 hours",
  },
  {
    id: 2,
    prescriptionId: 4,
    patientName: "Sarah Williams",
    createdDate: "2024-05-25",
    expiryDate: "2024-05-30",
    status: "accepted",
    total: 120.0,
    items: [
      { drug: "Metformin 500mg", quantity: "60 tablets", amount: 35.0 },
      { drug: "Insulin Glargine", quantity: "1 vial", amount: 80.0 },
    ],
    deliveryFee: 5.0,
    estimatedDelivery: "1-2 hours",
  },
  {
    id: 3,
    prescriptionId: 5,
    patientName: "Robert Brown",
    createdDate: "2024-05-24",
    expiryDate: "2024-05-29",
    status: "rejected",
    total: 45.0,
    items: [
      { drug: "Cetirizine 10mg", quantity: "30 tablets", amount: 20.0 },
      { drug: "Fluticasone Nasal Spray", quantity: "1 bottle", amount: 25.0 },
    ],
    deliveryFee: 5.0,
    estimatedDelivery: "Same day",
  },
  {
    id: 4,
    prescriptionId: 6,
    patientName: "Emily Davis",
    createdDate: "2024-05-23",
    expiryDate: "2024-05-28",
    status: "completed",
    total: 85.0,
    items: [
      { drug: "Amoxicillin 500mg", quantity: "30 capsules", amount: 45.0 },
      { drug: "Ibuprofen 600mg", quantity: "20 tablets", amount: 15.0 },
      { drug: "Cough Syrup", quantity: "1 bottle", amount: 25.0 },
    ],
    deliveryFee: 5.0,
    estimatedDelivery: "Express delivery",
  },
  {
    id: 5,
    prescriptionId: 7,
    patientName: "David Wilson",
    createdDate: "2024-05-22",
    expiryDate: "2024-05-27",
    status: "completed",
    total: 55.0,
    items: [{ drug: "Atorvastatin 20mg", quantity: "30 tablets", amount: 50.0 }],
    deliveryFee: 5.0,
    estimatedDelivery: "Standard delivery",
  },
]

export default function QuotationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredQuotations = quotations.filter((quotation) => {
    const matchesSearch = quotation.patientName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || quotation.status === selectedStatus
    const matchesTab = activeTab === "all" || quotation.status === activeTab
    return matchesSearch && matchesStatus && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 mr-1" />
      case "accepted":
        return <CheckCircle className="w-4 h-4 mr-1" />
      case "rejected":
        return <XCircle className="w-4 h-4 mr-1" />
      case "completed":
        return <CheckCircle className="w-4 h-4 mr-1" />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <PharmacySidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quotations</h1>
            <p className="text-gray-600 dark:text-gray-400">Track and manage all quotations sent to patients</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Filters and Search */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by patient name..."
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
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
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
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Quotations List */}
          <div className="grid gap-4">
            {filteredQuotations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quotations found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filteredQuotations.map((quotation) => (
                <Card key={quotation.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{quotation.patientName}</h3>
                          <Badge className={getStatusColor(quotation.status)}>
                            <div className="flex items-center">
                              {getStatusIcon(quotation.status)}
                              <span>{quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}</span>
                            </div>
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Created: {new Date(quotation.createdDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-gray-900 dark:text-white font-medium">${quotation.total.toFixed(2)}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {quotation.items.length} items • Expires:{" "}
                            {new Date(quotation.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Quotation Details</DialogTitle>
                              <DialogDescription>
                                Quotation #{quotation.id} for {quotation.patientName}
                              </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6">
                              {/* Status and Dates */}
                              <div className="flex justify-between items-center">
                                <Badge className={getStatusColor(quotation.status)}>
                                  <div className="flex items-center">
                                    {getStatusIcon(quotation.status)}
                                    <span>{quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}</span>
                                  </div>
                                </Badge>
                                <div className="text-sm text-gray-500">
                                  Created: {new Date(quotation.createdDate).toLocaleDateString()} | Expires:{" "}
                                  {new Date(quotation.expiryDate).toLocaleDateString()}
                                </div>
                              </div>

                              {/* Items */}
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Items</h3>
                                <div className="space-y-2">
                                  {quotation.items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                    >
                                      <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{item.drug}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.quantity}</p>
                                      </div>
                                      <p className="font-medium text-gray-900 dark:text-white">
                                        ${item.amount.toFixed(2)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Summary */}
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                  <span className="font-medium">
                                    ${(quotation.total - quotation.deliveryFee).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                                  <span className="font-medium">${quotation.deliveryFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    ${quotation.total.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              {/* Delivery Info */}
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Delivery Information</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                  Estimated delivery time: {quotation.estimatedDelivery}
                                </p>
                              </div>

                              {/* Status-specific information */}
                              {quotation.status === "accepted" && (
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                  <p className="text-green-800 dark:text-green-300 font-medium">
                                    ✓ Quotation accepted by patient
                                  </p>
                                  <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                                    Prepare the order for delivery.
                                  </p>
                                </div>
                              )}

                              {quotation.status === "rejected" && (
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                  <p className="text-red-800 dark:text-red-300 font-medium">
                                    ✗ Quotation rejected by patient
                                  </p>
                                </div>
                              )}

                              {quotation.status === "completed" && (
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                  <p className="text-blue-800 dark:text-blue-300 font-medium">
                                    ✓ Order completed and delivered
                                  </p>
                                </div>
                              )}
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
        </main>
      </div>
    </div>
  )
}
