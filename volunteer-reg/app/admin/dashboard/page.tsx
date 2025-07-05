"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, MapPin, Clock, RefreshCw, Bug } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { useRouter } from "next/navigation"

interface DashboardStats {
  totalRegistrations: number
  registrationsByTaluka: Record<string, number>
  recentRegistrations: Array<{
    id: string
    name: string
    taluka: string
    createdAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const router = useRouter()

  const fetchStats = async () => {
    const token = localStorage.getItem("admin_token")
    if (!token) {
      router.push("/admin/login")
      return
    }

    try {
      setIsLoading(true)
      console.log("🔄 Fetching dashboard stats...")

      const response = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.status === 401) {
        console.warn("⛔ Token invalid or expired, redirecting to login")
        localStorage.removeItem("admin_token")
        router.push("/admin/login")
        return
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error("❌ Failed to fetch stats:", response.status, errorText)
        return
      }

      const data = await response.json()
      console.log("📊 Dashboard stats received:", data)
      console.log("📍 Taluka data for chart:", data.registrationsByTaluka)

      setStats(data)
    } catch (err) {
      console.error("❌ Network error fetching stats:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDebugInfo = async () => {
    try {
      console.log("🐛 Fetching debug info...")
      const response = await fetch("/api/debug/volunteers")
      if (response.ok) {
        const data = await response.json()
        console.log("🐛 Debug info:", data)
        setDebugInfo(data)
        alert(
          `Debug Info:\nTotal Volunteers: ${data.totalVolunteers}\nDatabase Type: ${data.databaseType}\nCheck console for full details.`,
        )
      }
    } catch (error) {
      console.error("❌ Failed to fetch debug info:", error)
    }
  }

  useEffect(() => {
    fetchStats()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </AdminLayout>
    )
  }

  if (!isLoading && !stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-red-600">
          Failed to load statistics. Please refresh.
        </div>
      </AdminLayout>
    )
  }

  const chartData = stats?.registrationsByTaluka
    ? Object.entries(stats.registrationsByTaluka).map(([taluka, count]) => {
        console.log("📊 Chart data point:", { taluka, count })
        return { taluka, count }
      })
    : []

  console.log("📈 Final chart data:", chartData)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Overview of volunteer registrations</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchStats} variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button onClick={fetchDebugInfo} variant="outline" size="sm">
              <Bug className="mr-2 h-4 w-4" />
              Debug
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalRegistrations || 0}</div>
              <p className="text-xs text-muted-foreground">Total volunteers registered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Talukas</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats?.registrationsByTaluka ? Object.keys(stats.registrationsByTaluka).length : 0}
              </div>
              <p className="text-xs text-muted-foreground">Talukas with registrations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12%</div>
              <p className="text-xs text-muted-foreground">From last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.recentRegistrations?.length || 0}</div>
              <p className="text-xs text-muted-foreground">New registrations today</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Registrations by Taluka</CardTitle>
            </CardHeader>
            <CardContent>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="taluka" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
                  <p>No registration data available</p>
                  <p className="text-sm mt-2">Register some volunteers to see the chart</p>
                  <Button onClick={fetchStats} variant="outline" size="sm" className="mt-4 bg-transparent">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentRegistrations?.slice(0, 5).map((registration) => (
                  <div key={registration.id} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{registration.name}</p>
                      <p className="text-xs text-gray-500">{registration.taluka}</p>
                    </div>
                    <div className="text-xs text-gray-400">{new Date(registration.createdAt).toLocaleDateString()}</div>
                  </div>
                )) || <p className="text-gray-500 text-center py-4">No recent registrations</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Debug Info Display */}
        {debugInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
