"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { UserSidebar } from "@/components/user-sidebar"
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import { FileText } from "lucide-react" // Declared FileText variable

// Dummy data
const quotations = [
  {
    id: 1,
    prescriptionId: 2,
    pharmacyName: "Green Valley Pharmacy",
    pharmacyAddress: "123 Green St, City",
    pharmacyPhone: "+1 234-567-8900",
    status: "pending",
    total: 75.0,
    createdDate: "2024-05-28",
    expiryDate: "2024-06-02",
    items: [
      { drug: "Amoxicillin 250mg", quantity: "10.00 x 5", amount: 50.0 },
      { drug: "Paracetamol 500mg", quantity: "5.00 x 5", amount: 25.0 },
    ],
    deliveryFee: 5.0,
    estimatedDelivery: "2-3 hours",
  },
  {
    id: 2,
    prescriptionId: 3,
    pharmacyName: "City Care Pharmacy",
    pharmacyAddress: "456 Main Ave, City",
    pharmacyPhone: "+1 234-567-8901",
    status: "accepted",
    total: 45.0,
    createdDate: "2024-05-25",
    expiryDate: "2024-05-30",
    items: [{ drug: "Lisinopril 10mg", quantity: "30 tablets", amount: 40.0 }],
    deliveryFee: 5.0,
    estimatedDelivery: "1-2 hours",
  },
  {
    id: 3,
    prescriptionId: 4,
    pharmacyName: "Health Plus Pharmacy",
    pharmacyAddress: "789 Oak Blvd, City",
    pharmacyPhone: "+1 234-567-8902",
    status: "rejected",
    total: 120.0,
    createdDate: "2024-05-24",
    expiryDate: "2024-05-29",
    items: [{ drug: "Insulin Glargine", quantity: "1 vial", amount: 115.0 }],
    deliveryFee: 5.0,
    estimatedDelivery: "Same day",
  },
]

export default function QuotationsPage() {
  const { toast } = useToast()
  const [selectedQuotation, setSelectedQuotation] = useState(null)

  const handleAccept = (quotationId: number) => {
    toast({
      title: "Quotation accepted!",
      description: "The pharmacy has been notified and will prepare your order.",
    })
  }

  const handleReject = (quotationId: number) => {
    toast({
      title: "Quotation rejected",
      description: "The pharmacy has been notified of your decision.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <UserSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quotations</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and manage quotations from pharmacies</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            {quotations.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quotations yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload a prescription to start receiving quotations from pharmacies.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {quotations.map((quotation) => (
                  <Card key={quotation.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{quotation.pharmacyName}</span>
                            <Badge className={getStatusColor(quotation.status)}>
                              {getStatusIcon(quotation.status)}
                              <span className="ml-1">
                                {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                              </span>
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {quotation.pharmacyAddress} • {quotation.pharmacyPhone}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${quotation.total.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">+ ${quotation.deliveryFee.toFixed(2)} delivery</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Items */}
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Items</h4>
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
                                <p className="font-medium text-gray-900 dark:text-white">${item.amount.toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Created</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {new Date(quotation.createdDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Expires</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {new Date(quotation.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Estimated Delivery</p>
                            <p className="font-medium text-gray-900 dark:text-white">{quotation.estimatedDelivery}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        {quotation.status === "pending" && (
                          <div className="flex space-x-3 pt-4">
                            <Button
                              onClick={() => handleAccept(quotation.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleReject(quotation.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                            <Button variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </div>
                        )}

                        {quotation.status === "accepted" && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                            <p className="text-green-800 dark:text-green-300 font-medium">
                              ✓ Order accepted and being prepared
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                              You will receive a confirmation call shortly.
                            </p>
                          </div>
                        )}

                        {quotation.status === "rejected" && (
                          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                            <p className="text-red-800 dark:text-red-300 font-medium">✗ Quotation rejected</p>
                            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                              The pharmacy has been notified of your decision.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
