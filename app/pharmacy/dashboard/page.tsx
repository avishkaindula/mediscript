"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Clock, CheckCircle, DollarSign, Bell, Plus, Eye, Send } from "lucide-react"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
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
]

export default function PharmacyDashboard() {
  const { toast } = useToast()
  const [selectedPrescription, setSelectedPrescription] = useState(null)
  const [quotationItems, setQuotationItems] = useState([{ drug: "", quantity: "", price: "" }])

  const addQuotationItem = () => {
    setQuotationItems([...quotationItems, { drug: "", quantity: "", price: "" }])
  }

  const updateQuotationItem = (index: number, field: string, value: string) => {
    const updated = quotationItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setQuotationItems(updated)
  }

  const removeQuotationItem = (index: number) => {
    setQuotationItems(quotationItems.filter((_, i) => i !== index))
  }

  const calculateTotal = () => {
    return quotationItems
      .reduce((total, item) => {
        const price = Number.parseFloat(item.price) || 0
        return total + price
      }, 0)
      .toFixed(2)
  }

  const sendQuotation = () => {
    toast({
      title: "Quotation sent successfully!",
      description: "The patient will be notified via email and can view the quotation in their dashboard.",
    })
    setSelectedPrescription(null)
    setQuotationItems([{ drug: "", quantity: "", price: "" }])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "quoted":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <PharmacySidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pharmacy Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage prescriptions and create quotations</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button size="icon" variant="ghost">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>GV</AvatarFallback>
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
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Prescriptions</p>
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
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Quotes</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">23</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">$2,450</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prescriptions List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Prescriptions</h2>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>

            <div className="grid gap-4">
              {prescriptions.map((prescription) => (
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
                              <DialogDescription>Review prescription and create quotation</DialogDescription>
                            </DialogHeader>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                  <h4 className="font-medium mb-2">Patient Notes</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{prescription.note}</p>
                                </div>
                              </div>

                              {/* Quotation Form */}
                              <div>
                                <h3 className="font-semibold mb-4">Create Quotation</h3>
                                <div className="space-y-4">
                                  {quotationItems.map((item, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                                      <div className="col-span-5">
                                        <Label htmlFor={`drug-${index}`}>Drug</Label>
                                        <Input
                                          id={`drug-${index}`}
                                          placeholder="Medicine name"
                                          value={item.drug}
                                          onChange={(e) => updateQuotationItem(index, "drug", e.target.value)}
                                        />
                                      </div>
                                      <div className="col-span-3">
                                        <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                                        <Input
                                          id={`quantity-${index}`}
                                          placeholder="Qty"
                                          value={item.quantity}
                                          onChange={(e) => updateQuotationItem(index, "quantity", e.target.value)}
                                        />
                                      </div>
                                      <div className="col-span-3">
                                        <Label htmlFor={`price-${index}`}>Amount</Label>
                                        <Input
                                          id={`price-${index}`}
                                          type="number"
                                          step="0.01"
                                          placeholder="0.00"
                                          value={item.price}
                                          onChange={(e) => updateQuotationItem(index, "price", e.target.value)}
                                        />
                                      </div>
                                      <div className="col-span-1">
                                        {quotationItems.length > 1 && (
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => removeQuotationItem(index)}
                                          >
                                            ×
                                          </Button>
                                        )}
                                      </div>
                                    </div>
                                  ))}

                                  <Button type="button" variant="outline" onClick={addQuotationItem} className="w-full">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Item
                                  </Button>

                                  <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                      <span>Total:</span>
                                      <span>${calculateTotal()}</span>
                                    </div>
                                  </div>

                                  <Link href={`/pharmacy/create-quote/${prescription.id}`}>
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                                      <Send className="w-4 h-4 mr-2" />
                                      Send Quotation
                                    </Button>
                                  </Link>
                                </div>
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
                              Create Quote
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
