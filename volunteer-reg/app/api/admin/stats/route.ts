import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const user = auth.verifyToken(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    console.log("📊 Fetching stats for admin dashboard...")

    // Get all volunteers first
    const allVolunteers = await db.volunteers.findAll()
    console.log("👥 Total volunteers found:", allVolunteers.length)

    // Calculate total registrations
    const totalRegistrations = allVolunteers.length

    // Calculate registrations by taluka manually to ensure it works
    const registrationsByTaluka: Record<string, number> = {}
    allVolunteers.forEach((volunteer) => {
      const taluka = volunteer.taluka
      registrationsByTaluka[taluka] = (registrationsByTaluka[taluka] || 0) + 1
    })

    console.log("📍 Registrations by Taluka:", registrationsByTaluka)

    // Get recent registrations (last 10)
    const recentRegistrations = allVolunteers.slice(0, 10).map((v) => ({
      id: v.id,
      name: v.name,
      taluka: v.taluka,
      createdAt: v.created_at,
    }))

    const response = {
      totalRegistrations,
      registrationsByTaluka,
      recentRegistrations,
    }

    console.log("✅ Sending stats response:", response)

    return NextResponse.json(response)
  } catch (error) {
    console.error("💥 Error in admin stats API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
