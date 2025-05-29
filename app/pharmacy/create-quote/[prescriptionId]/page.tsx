"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { Plus, X, Send, FileText, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Dummy prescription data - in real app this would come from API
const prescriptionData = {
  1: {
    id: 1,
    patientName: "John Doe",
    uploadDate: "2024-05-28",
    note: "Urgent - needed for tonight",
    deliveryAddress: "123 Main St, City",
    deliveryTime: "6:00 PM - 8:00 PM",
    phone: "+1 234-567-8900",
    images: 3,
  },
  2: {
    id: 2,
    patientName: "Jane Smith",
    uploadDate: "2024-05-27",
    note: "Regular medication refill",
    deliveryAddress: "456 Oak Ave, City",
    deliveryTime: "2:00 PM - 4:00 PM",
    phone: "+1 234-567-8901",
    images: 2,
  },
}

export default function CreateQuotePage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const prescriptionId = params.prescriptionId as string
  const prescription = prescriptionData[prescriptionId as keyof typeof prescriptionData]

  const [quotationItems, setQuotationItems] = useState([{ drug: "", quantity: "", price: "", notes: "" }])
  const [deliveryFee, setDeliveryFee] = useState("5.00")
  const [estimatedDelivery, setEstimatedDelivery] = useState("2-3 hours")
  const [quotationNotes, setQuotationNotes] = useState("")

  const addQuotationItem = () => {
    setQuotationItems([...quotationItems, { drug: "", quantity: "", price: "", notes: "" }])
  }

  const updateQuotationItem = (index: number, field: string, value: string) => {
    const updated = quotationItems.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    setQuotationItems(updated)
  }

  const removeQuotationItem = (index: number) => {
    if (quotationItems.length > 1) {
      setQuotationItems(quotationItems.filter((_, i) => i !== index))
    }
  }

  const calculateSubtotal = () => {
    return quotationItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price) || 0
      return total + price
    }, 0)
  }

  const calculateTotal = () => {
    return calculateSubtotal() + Number.parseFloat(deliveryFee)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate that at least one item has all required fields
    const validItems = quotationItems.filter((item) => item.drug.trim() && item.quantity.trim() && item.price.trim())

    if (validItems.length === 0) {
      toast({
        title: "Invalid quotation",
        description: "Please add at least one complete item with drug name, quantity, and price.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Quotation sent successfully!",
      description: `Quotation for ${prescription?.patientName} has been sent. The patient will be notified via email.`,
    })

    setLoading(false)
    router.push("/pharmacy/quotations")
  }

  if (!prescription) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <PharmacySidebar />
        <div className="flex-1 flex items-center justify-center">
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Prescription not found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The prescription you're looking for doesn't exist.
              </p>
              <Link href="/pharmacy/prescriptions">
                <Button>Back to Prescriptions</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <PharmacySidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Link href="/pharmacy/prescriptions">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Quotation</h1>
                <p className="text-gray-600 dark:text-gray-400">Create quotation for {prescription.patientName}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Prescription Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Prescription Details</CardTitle>
                    <CardDescription>Review the prescription information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Prescription Images */}
                      <div>
                        <h4 className="font-medium mb-2">Prescription Images</h4>
                        <div className="space-y-2">
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Patient Name</p>
                          <p className="font-medium">{prescription.patientName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium">{prescription.phone}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Delivery Address</p>
                          <p className="font-medium">{prescription.deliveryAddress}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Preferred Delivery Time</p>
                          <p className="font-medium">{prescription.deliveryTime}</p>
                        </div>
                      </div>

                      {/* Patient Notes */}
                      <div>
                        <p className="text-sm text-gray-500">Patient Notes</p>
                        <p className="font-medium p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">{prescription.note}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quotation Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Create Quotation</CardTitle>
                    <CardDescription>Add medications and pricing details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Quotation Items */}
                      <div>
                        <Label className="text-base font-medium">Medications</Label>
                        <div className="space-y-4 mt-2">
                          {quotationItems.map((item, index) => (
                            <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-medium">Item {index + 1}</h4>
                                {quotationItems.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeQuotationItem(index)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-1 gap-3">
                                <div>
                                  <Label htmlFor={`drug-${index}`}>Medicine Name *</Label>
                                  <Input
                                    id={`drug-${index}`}
                                    placeholder="e.g., Amoxicillin 500mg"
                                    value={item.drug}
                                    onChange={(e) => updateQuotationItem(index, "drug", e.target.value)}
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                  <div>
                                    <Label htmlFor={`quantity-${index}`}>Quantity *</Label>
                                    <Input
                                      id={`quantity-${index}`}
                                      placeholder="e.g., 30 tablets"
                                      value={item.quantity}
                                      onChange={(e) => updateQuotationItem(index, "quantity", e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`price-${index}`}>Amount ($) *</Label>
                                    <Input
                                      id={`price-${index}`}
                                      type="number"
                                      step="0.01"
                                      placeholder="0.00"
                                      value={item.price}
                                      onChange={(e) => updateQuotationItem(index, "price", e.target.value)}
                                    />
                                  </div>
                                </div>

                                <div>
                                  <Label htmlFor={`notes-${index}`}>Notes (Optional)</Label>
                                  <Input
                                    id={`notes-${index}`}
                                    placeholder="Additional notes for this item"
                                    value={item.notes}
                                    onChange={(e) => updateQuotationItem(index, "notes", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <Button type="button" variant="outline" onClick={addQuotationItem} className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Another Item
                          </Button>
                        </div>
                      </div>

                      {/* Delivery Information */}
                      <div className="space-y-4">
                        <Label className="text-base font-medium">Delivery Information</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="deliveryFee">Delivery Fee ($)</Label>
                            <Input
                              id="deliveryFee"
                              type="number"
                              step="0.01"
                              value={deliveryFee}
                              onChange={(e) => setDeliveryFee(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                            <Input
                              id="estimatedDelivery"
                              placeholder="e.g., 2-3 hours"
                              value={estimatedDelivery}
                              onChange={(e) => setEstimatedDelivery(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <Label htmlFor="quotationNotes">Additional Notes (Optional)</Label>
                        <Textarea
                          id="quotationNotes"
                          placeholder="Any additional information or special instructions..."
                          value={quotationNotes}
                          onChange={(e) => setQuotationNotes(e.target.value)}
                          rows={3}
                        />
                      </div>

                      {/* Total Summary */}
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${calculateSubtotal().toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Delivery Fee:</span>
                            <span>${Number.parseFloat(deliveryFee).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span>Total:</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex space-x-3">
                        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                        >
                          {loading ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Quotation
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
