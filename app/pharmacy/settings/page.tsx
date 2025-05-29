"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { PharmacySidebar } from "@/components/pharmacy-sidebar"
import { Shield, Bell, Mail, Clock, Phone, Building, Save, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PharmacySettings() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Settings saved successfully!",
      description: "Your pharmacy settings have been updated.",
    })

    setLoading(false)
  }

  return (
    <>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your pharmacy settings and preferences</p>
      </header>
      <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="profile">Pharmacy Profile</TabsTrigger>
          <TabsTrigger value="business">Business Hours</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Pharmacy Profile */}
        <TabsContent value="profile">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pharmacy Information</CardTitle>
                <CardDescription>Update your pharmacy's basic information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pharmacyName">Pharmacy Name</Label>
                      <Input id="pharmacyName" defaultValue="Green Valley Pharmacy" />
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">License Number</Label>
                      <Input id="licenseNumber" defaultValue="PHR-12345-XYZ" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="contact@greenvalleypharmacy.com" />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue="+1 234-567-8900" />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Green Street, City, State 12345" rows={3} />
                  </div>

                  <div>
                    <Label htmlFor="description">Pharmacy Description</Label>
                    <Textarea
                      id="description"
                      defaultValue="Green Valley Pharmacy is a full-service pharmacy dedicated to providing quality healthcare products and services to our community since 2010."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label>Pharmacy Logo</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                        <Building className="w-8 h-8 text-green-600" />
                      </div>
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Logo
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading}>
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
                <CardDescription>Configure your delivery options and fees</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Offer Delivery</p>
                      <p className="text-sm text-gray-500">Enable delivery services for your customers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryRadius">Delivery Radius (km)</Label>
                      <Input id="deliveryRadius" type="number" defaultValue="10" />
                    </div>
                    <div>
                      <Label htmlFor="deliveryFee">Standard Delivery Fee ($)</Label>
                      <Input id="deliveryFee" type="number" step="0.01" defaultValue="5.00" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minOrderFreeDelivery">Minimum Order for Free Delivery ($)</Label>
                      <Input id="minOrderFreeDelivery" type="number" step="0.01" defaultValue="50.00" />
                    </div>
                    <div>
                      <Label htmlFor="expressDeliveryFee">Express Delivery Fee ($)</Label>
                      <Input id="expressDeliveryFee" type="number" step="0.01" defaultValue="10.00" />
                    </div>
                  </div>

                  <Button type="submit">Save Delivery Settings</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Hours */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your pharmacy's operating hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <div className="w-28">
                      <p className="font-medium">{day}</p>
                    </div>
                    <div className="flex-1 flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch id={`${day.toLowerCase()}-open`} defaultChecked={day !== "Sunday"} />
                        <Label htmlFor={`${day.toLowerCase()}-open`}>Open</Label>
                      </div>
                      {day !== "Sunday" && (
                        <div className="flex items-center space-x-2">
                          <Select defaultValue="09:00">
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }).map((_, i) => {
                                const hour = i.toString().padStart(2, "0")
                                return (
                                  <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                    {`${hour}:00`}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                          <span>to</span>
                          <Select defaultValue={day === "Saturday" ? "17:00" : "19:00"}>
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }).map((_, i) => {
                                const hour = i.toString().padStart(2, "0")
                                return (
                                  <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                                    {`${hour}:00`}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <Button type="submit">Save Business Hours</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about new prescriptions and updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">New Prescription Alerts</p>
                    <p className="text-sm text-gray-500">Get notified when a new prescription is uploaded</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive urgent updates via SMS</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Quotation Expiry Reminders</p>
                    <p className="text-sm text-gray-500">Get reminded when quotations are about to expire</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <Button type="button">Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Change Password</span>
                </CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" required />
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" required />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" required />
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Require a verification code when signing in</p>
                  </div>
                  <Switch />
                </div>

                <Button type="button" variant="outline" disabled>
                  Set Up Two-Factor Authentication
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Actions</CardTitle>
                <CardDescription>Manage your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Export Account Data
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
