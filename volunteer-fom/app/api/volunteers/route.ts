import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

// Simple validation function instead of Yup for server-side
function validateVolunteerData(data: any) {
  const errors: string[] = []

  if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters")
  }

  if (!data.mobile || typeof data.mobile !== "string" || !/^[6-9]\d{9}$/.test(data.mobile)) {
    errors.push("Please enter a valid 10-digit mobile number")
  }

  if (!data.taluka || typeof data.taluka !== "string") {
    errors.push("Please select your Taluka")
  }

  if (!data.age_group || typeof data.age_group !== "string") {
    errors.push("Please select your age group")
  }

  if (!data.education || typeof data.education !== "string") {
    errors.push("Please select your education level")
  }

  if (!data.occupation || typeof data.occupation !== "string" || data.occupation.trim().length < 2) {
    errors.push("Occupation is required and must be at least 2 characters")
  }

  if (!data.prabhag || typeof data.prabhag !== "string" || data.prabhag.trim().length < 2) {
    errors.push("Prabhag is required and must be at least 2 characters")
  }

  if (!data.strengthen_party || typeof data.strengthen_party !== "string" || data.strengthen_party.trim().length < 10) {
    errors.push("Please describe how you can strengthen the party (at least 10 characters)")
  }

  if (!data.ready_to_join || !["yes", "no"].includes(data.ready_to_join)) {
    errors.push("Please select if you are ready to join AIMIM Parbhani")
  }

  return errors
}

export async function POST(request: NextRequest) {
  try {
    console.log("📝 Volunteer registration API called")

    const body = await request.json()
    console.log("📋 Received data:", body)

    // Validate the data
    const validationErrors = validateVolunteerData(body)
    if (validationErrors.length > 0) {
      console.log("❌ Validation errors:", validationErrors)
      return NextResponse.json({ error: validationErrors.join(", ") }, { status: 400 })
    }

    // Clean and prepare data
    const cleanData = {
      name: body.name.trim(),
      mobile: body.mobile.trim(),
      taluka: body.taluka,
      age_group: body.age_group,
      education: body.education,
      occupation: body.occupation.trim(),
      prabhag: body.prabhag.trim(),
      strengthen_party: body.strengthen_party.trim(),
      ready_to_join: body.ready_to_join,
    }

    console.log("🧹 Cleaned data:", cleanData)

    // Check if mobile number already exists
    console.log("🔍 Checking for existing mobile number...")
    const existingVolunteer = await db.volunteers.findByMobile(cleanData.mobile)

    if (existingVolunteer) {
      console.log("⚠️ Duplicate mobile number found:", cleanData.mobile)
      return NextResponse.json({ error: "You have already registered with this mobile number." }, { status: 409 })
    }

    // Create new volunteer
    console.log("✨ Creating new volunteer...")
    const volunteer = await db.volunteers.create(cleanData)

    console.log("✅ Volunteer created successfully:", volunteer.name)

    return NextResponse.json({ success: true, volunteer }, { status: 201 })
  } catch (error) {
    console.error("💥 API Error:", error)

    // Return a more specific error message
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
      return NextResponse.json(
        {
          error: "Registration failed: " + error.message,
          details: process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: "Internal server error occurred during registration" }, { status: 500 })
  }
}
