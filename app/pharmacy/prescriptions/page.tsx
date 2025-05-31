"use client"

import { useState, useEffect } from "react"
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
import { createClient } from "@/utils/supabase/client"
import type { Tables } from "@/utils/supabase/types"

// Types

type Prescription = Tables<"prescriptions"> & {
  quotes: Tables<"quotes">[]
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    const fetchPrescriptions = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("prescriptions")
        .select("*, quotes(*)")
        .order("created_at", { ascending: false });
      if (data) setPrescriptions(data as Prescription[]);
      setLoading(false);
    };
    fetchPrescriptions();
  }, []);

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

  // Determine the status for filtering
  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      (prescription.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.note?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prescription.phone?.toLowerCase().includes(searchQuery.toLowerCase()))
    let statusMatch = false;
    if (selectedStatus === "all") statusMatch = true;
    else if (selectedStatus === "pending") statusMatch = prescription.quotes.length === 0;
    else if (selectedStatus === "quoted") statusMatch = prescription.quotes.length > 0;
    else if (selectedStatus === "accepted") statusMatch = prescription.quotes.some(q => q.status === "accepted");
    else if (selectedStatus === "rejected") statusMatch = prescription.quotes.some(q => q.status === "rejected");
    return matchesSearch && statusMatch;
  });

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
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6" value={selectedStatus} onValueChange={setSelectedStatus}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="quoted">Quoted</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Prescriptions List */}
      <div className="grid gap-4">
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Loading prescriptions...</h3>
            </CardContent>
          </Card>
        ) : filteredPrescriptions.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No prescriptions found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredPrescriptions.map((prescription) => {
            // Determine status for badge
            let badgeStatus = "pending";
            if (prescription.quotes.some(q => q.status === "accepted")) badgeStatus = "accepted";
            else if (prescription.quotes.some(q => q.status === "rejected")) badgeStatus = "rejected";
            else if (prescription.quotes.length > 0) badgeStatus = "quoted";
            return (
              <Card key={prescription.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{prescription.address}</h3>
                        <Badge className={getStatusColor(badgeStatus)}>
                          {badgeStatus.charAt(0).toUpperCase() + badgeStatus.slice(1)}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {new Date(prescription.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-900 dark:text-white mb-1">{prescription.note}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Delivery: {prescription.preferred_time_slot}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {prescription.address} • {prescription.phone}
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
                            <DialogTitle>Prescription Details</DialogTitle>
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
                                {/* You can render thumbnails for each file in prescription.files here */}
                              </div>
                            </div>

                            {/* Patient Information */}
                            <div>
                              <h3 className="font-semibold mb-4">Patient Information</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-500">Phone</p>
                                  <p className="font-medium">{prescription.phone}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Delivery Address</p>
                                  <p className="font-medium">{prescription.address}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Delivery Time</p>
                                  <p className="font-medium">{prescription.preferred_time_slot}</p>
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
                              {prescription.quotes.length === 0 && (
                                <Link href={`/pharmacy/create-quote/${prescription.id}`}>
                                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                                    <Send className="w-4 h-4 mr-2" />
                                    Create Quotation
                                  </Button>
                                </Link>
                              )}
                              {prescription.quotes.length > 0 && <Button variant="outline">View Quotation</Button>}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {prescription.quotes.length === 0 && (
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
            )
          })
        )}
      </div>
    </>
  )
}
