"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download } from "lucide-react"
import { TALUKAS, AGE_GROUPS, EDUCATION_LEVELS } from "@/lib/constants"
import type { Volunteer } from "@/lib/database"

export default function RegistrationsPage() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([])
  const [filteredVolunteers, setFilteredVolunteers] = useState<Volunteer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTaluka, setSelectedTaluka] = useState<string>("all")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("all")
  const [selectedEducation, setSelectedEducation] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const token = localStorage.getItem("admin_token")
        const response = await fetch("/api/admin/volunteers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setVolunteers(data)
          setFilteredVolunteers(data)
        }
      } catch (error) {
        console.error("Failed to fetch volunteers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVolunteers()
  }, [])

  useEffect(() => {
    let filtered = volunteers

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (volunteer) =>
          volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          volunteer.mobile.includes(searchTerm) ||
          volunteer.occupation.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Taluka filter
    if (selectedTaluka !== "all") {
      filtered = filtered.filter((volunteer) => volunteer.taluka === selectedTaluka)
    }

    // Age group filter
    if (selectedAgeGroup !== "all") {
      filtered = filtered.filter((volunteer) => volunteer.age_group === selectedAgeGroup)
    }

    // Education filter
    if (selectedEducation !== "all") {
      filtered = filtered.filter((volunteer) => volunteer.education === selectedEducation)
    }

    setFilteredVolunteers(filtered)
    setCurrentPage(1)
  }, [volunteers, searchTerm, selectedTaluka, selectedAgeGroup, selectedEducation])

  const totalPages = Math.ceil(filteredVolunteers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVolunteers = filteredVolunteers.slice(startIndex, startIndex + itemsPerPage)

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Mobile",
      "Taluka",
      "Age Group",
      "Education",
      "Occupation",
      "Prabhag",
      "Ready to Join",
      "Registration Date",
    ]

    const csvContent = [
      headers.join(","),
      ...filteredVolunteers.map((volunteer) =>
        [
          volunteer.name,
          volunteer.mobile,
          volunteer.taluka,
          volunteer.age_group,
          volunteer.education,
          volunteer.occupation,
          volunteer.prabhag,
          volunteer.ready_to_join,
          new Date(volunteer.created_at).toLocaleDateString(),
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "aimim-volunteers.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Volunteer Registrations</h1>
            <p className="text-gray-600">
              {filteredVolunteers.length} of {volunteers.length} volunteers
            </p>
          </div>
          <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, mobile, or occupation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedTaluka} onValueChange={setSelectedTaluka}>
                <SelectTrigger>
                  <SelectValue placeholder="All Talukas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Talukas</SelectItem>
                  {TALUKAS.map((taluka) => (
                    <SelectItem key={taluka} value={taluka}>
                      {taluka}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="All Age Groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Age Groups</SelectItem>
                  {AGE_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedEducation} onValueChange={setSelectedEducation}>
                <SelectTrigger>
                  <SelectValue placeholder="All Education Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Education Levels</SelectItem>
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Volunteers Table/Cards */}
        <Card>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volunteer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedVolunteers.map((volunteer) => (
                    <tr key={volunteer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{volunteer.name}</div>
                          <div className="text-sm text-gray-500">{volunteer.occupation}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{volunteer.mobile}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{volunteer.taluka}</div>
                          <div className="text-sm text-gray-500">{volunteer.prabhag}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{volunteer.age_group}</div>
                          <div className="text-sm text-gray-500">{volunteer.education}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge
                          variant={volunteer.ready_to_join === "yes" ? "default" : "secondary"}
                          className={
                            volunteer.ready_to_join === "yes"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {volunteer.ready_to_join === "yes" ? "Ready" : "Not Ready"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(volunteer.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden p-4 space-y-4">
              {paginatedVolunteers.map((volunteer) => (
                <Card key={volunteer.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                        <p className="text-sm text-gray-600">{volunteer.mobile}</p>
                      </div>
                      <Badge
                        variant={volunteer.ready_to_join === "yes" ? "default" : "secondary"}
                        className={
                          volunteer.ready_to_join === "yes"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {volunteer.ready_to_join === "yes" ? "Ready" : "Not Ready"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Taluka:</span> {volunteer.taluka}
                      </div>
                      <div>
                        <span className="text-gray-500">Age:</span> {volunteer.age_group}
                      </div>
                      <div>
                        <span className="text-gray-500">Education:</span> {volunteer.education}
                      </div>
                      <div>
                        <span className="text-gray-500">Occupation:</span> {volunteer.occupation}
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-500">Prabhag:</span> {volunteer.prabhag}
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Registered: {new Date(volunteer.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVolunteers.length)} of{" "}
                  {filteredVolunteers.length} results
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
