"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Clock, Eye, FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
    createdDate: "2025-05-28",
    expiryDate: "2025-06-02",
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
    createdDate: "2025-05-25",
    expiryDate: "2025-05-30",
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
    createdDate: "2025-05-24",
    expiryDate: "2025-05-29",
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
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quotations</h1>
        <p className="text-gray-600 dark:text-gray-400">Review and manage quotations from pharmacies</p>
      </header>
      {/* Main quotations content */}
      {quotations.length === 0 ? (
        <Card>
          <CardContent className="p-8 md:p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quotations yet</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Upload a prescription to start receiving quotations from pharmacies.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 md:space-y-6">
          {quotations.map((quotation) => (
            <Card key={quotation.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <span className="text-lg md:text-xl">{quotation.pharmacyName}</span>
                      <Badge className={getStatusColor(quotation.status)}>
                        {getStatusIcon(quotation.status)}
                        <span className="ml-1">
                          {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                        </span>
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {quotation.pharmacyAddress} • {quotation.pharmacyPhone}
                    </CardDescription>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
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
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">{item.drug}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900 dark:text-white ml-4">
                            ${item.amount.toFixed(2)}
                          </p>
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
                  <div className="flex flex-col md:flex-row gap-3 pt-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full md:w-auto">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
                        <DialogHeader>
                          <DialogTitle>Quotation Details</DialogTitle>
                          <DialogDescription>
                            Quotation #{quotation.id} from {quotation.pharmacyName}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Status and Dates */}
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <Badge className={getStatusColor(quotation.status)}>
                              <div className="flex items-center">
                                {getStatusIcon(quotation.status)}
                                <span className="ml-1">
                                  {quotation.status.charAt(0).toUpperCase() + quotation.status.slice(1)}
                                </span>
                              </div>
                            </Badge>
                            <div className="text-sm text-gray-500">
                              Created: {new Date(quotation.createdDate).toLocaleDateString()} | Expires:{" "}
                              {new Date(quotation.expiryDate).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Pharmacy Information */}
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                              Pharmacy Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600 dark:text-gray-400">Name</p>
                                <p className="font-medium">{quotation.pharmacyName}</p>
                              </div>
                              <div>
                                <p className="text-gray-600 dark:text-gray-400">Phone</p>
                                <p className="font-medium">{quotation.pharmacyPhone}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-gray-600 dark:text-gray-400">Address</p>
                                <p className="font-medium">{quotation.pharmacyAddress}</p>
                              </div>
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
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                              Delivery Information
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              Estimated delivery time: {quotation.estimatedDelivery}
                            </p>
                          </div>

                          {/* Status-specific information */}
                          {quotation.status === "accepted" && (
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                              <p className="text-green-800 dark:text-green-300 font-medium">
                                ✓ Quotation accepted and being prepared
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
                      </DialogContent>
                    </Dialog>

                    {quotation.status === "pending" && (
                      <>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accept
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Accept Quotation</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to accept this quotation from {quotation.pharmacyName} for $
                                {quotation.total.toFixed(2)}? The pharmacy will be notified and will prepare your
                                order.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleAccept(quotation.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Accept Quotation
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full md:w-auto"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Reject
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reject Quotation</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to reject this quotation from {quotation.pharmacyName}? This
                                action cannot be undone and the pharmacy will be notified.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleReject(quotation.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Reject Quotation
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>

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
    </>
  )
}
