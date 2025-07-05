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

    console.log("Fetching all volunteers for admin...")

    const volunteers = await db.volunteers.findAll()
    console.log("Found volunteers:", volunteers.length)

    return NextResponse.json(volunteers)
  } catch (error) {
    console.error("Error in admin volunteers API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
