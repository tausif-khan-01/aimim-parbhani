import { NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET() {
  try {
    console.log("🔍 Debug: Checking volunteer database...")

    const volunteers = await db.volunteers.findAll()
    const count = await db.volunteers.count()
    const countByTaluka = await db.volunteers.countByTaluka()

    const debugInfo = {
      totalVolunteers: count,
      volunteers: volunteers,
      countByTaluka: countByTaluka,
      databaseType: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Supabase" : "Mock Database",
      timestamp: new Date().toISOString(),
    }

    console.log("📊 Debug info:", debugInfo)

    return NextResponse.json(debugInfo)
  } catch (error) {
    console.error("❌ Debug API error:", error)
    return NextResponse.json({ error: "Debug failed", details: error }, { status: 500 })
  }
}
