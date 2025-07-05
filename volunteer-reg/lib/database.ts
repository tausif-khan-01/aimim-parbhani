import { createClient } from "@supabase/supabase-js"

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: any = null
let useMockDatabase = false

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log("✅ Using Supabase database")
  } catch (error) {
    console.error("❌ Failed to initialize Supabase:", error)
    useMockDatabase = true
  }
} else {
  console.warn("⚠️ Supabase environment variables not found. Using mock database for development.")
  useMockDatabase = true
}

export interface Volunteer {
  id: string
  name: string
  mobile: string
  taluka: string
  age_group: string
  education: string
  occupation: string
  prabhag: string
  strengthen_party: string
  ready_to_join: string
  created_at: string
}

// Mock database for development - using a global variable to persist data
declare global {
  var mockVolunteers: Volunteer[] | undefined
}

// Initialize global mock database
if (useMockDatabase && !global.mockVolunteers) {
  global.mockVolunteers = []
  console.log("🗄️ Initialized mock database")
}

export const db = {
  volunteers: {
    create: async (data: Omit<Volunteer, "id" | "created_at">): Promise<Volunteer> => {
      try {
        if (useMockDatabase) {
          // Mock database implementation
          const volunteer: Volunteer = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString(),
          }
          global.mockVolunteers = global.mockVolunteers || []
          global.mockVolunteers.push(volunteer)
          console.log("✅ Created volunteer in mock database:", volunteer.name)
          console.log("📊 Total volunteers in mock database:", global.mockVolunteers.length)
          return volunteer
        }

        // Supabase implementation
        const { data: volunteer, error } = await supabase
          .from("volunteers")
          .insert([
            {
              name: data.name,
              mobile: data.mobile,
              taluka: data.taluka,
              age_group: data.age_group,
              education: data.education,
              occupation: data.occupation,
              prabhag: data.prabhag,
              strengthen_party: data.strengthen_party,
              ready_to_join: data.ready_to_join,
            },
          ])
          .select()
          .single()

        if (error) {
          console.error("❌ Supabase create error:", error)
          throw new Error(`Database error: ${error.message}`)
        }

        console.log("✅ Created volunteer in Supabase:", volunteer.name)
        return volunteer
      } catch (error) {
        console.error("💥 Error in create volunteer:", error)
        throw error
      }
    },

    findByMobile: async (mobile: string): Promise<Volunteer | null> => {
      try {
        if (useMockDatabase) {
          global.mockVolunteers = global.mockVolunteers || []
          const found = global.mockVolunteers.find((v) => v.mobile === mobile) || null
          console.log("🔍 Searching for mobile in mock database:", mobile, found ? "FOUND" : "NOT FOUND")
          return found
        }

        const { data, error } = await supabase.from("volunteers").select("*").eq("mobile", mobile).single()

        if (error && error.code !== "PGRST116") {
          console.error("❌ Supabase findByMobile error:", error)
          throw new Error(`Database search error: ${error.message}`)
        }

        console.log("🔍 Searching for mobile in Supabase:", mobile, data ? "FOUND" : "NOT FOUND")
        return data || null
      } catch (error) {
        console.error("💥 Error in findByMobile:", error)
        throw error
      }
    },

    findAll: async (): Promise<Volunteer[]> => {
      try {
        if (useMockDatabase) {
          global.mockVolunteers = global.mockVolunteers || []
          const sorted = global.mockVolunteers.sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
          )
          console.log("📋 Fetching all volunteers from mock database:", sorted.length)
          return sorted
        }

        const { data, error } = await supabase.from("volunteers").select("*").order("created_at", { ascending: false })

        if (error) {
          console.error("❌ Supabase findAll error:", error)
          throw new Error(`Database fetch error: ${error.message}`)
        }

        console.log("📋 Fetching all volunteers from Supabase:", data?.length || 0)
        return data || []
      } catch (error) {
        console.error("💥 Error in findAll:", error)
        throw error
      }
    },

    count: async (): Promise<number> => {
      try {
        if (useMockDatabase) {
          global.mockVolunteers = global.mockVolunteers || []
          const count = global.mockVolunteers.length
          console.log("🔢 Counting volunteers in mock database:", count)
          return count
        }

        const { count, error } = await supabase.from("volunteers").select("*", { count: "exact", head: true })

        if (error) {
          console.error("❌ Supabase count error:", error)
          throw new Error(`Database count error: ${error.message}`)
        }

        console.log("🔢 Counting volunteers in Supabase:", count || 0)
        return count || 0
      } catch (error) {
        console.error("💥 Error in count:", error)
        throw error
      }
    },

    countByTaluka: async (): Promise<Record<string, number>> => {
      try {
        if (useMockDatabase) {
          global.mockVolunteers = global.mockVolunteers || []
          const counts: Record<string, number> = {}
          global.mockVolunteers.forEach((volunteer) => {
            counts[volunteer.taluka] = (counts[volunteer.taluka] || 0) + 1
          })
          console.log("📊 Counting by Taluka in mock database:", counts)
          return counts
        }

        const { data, error } = await supabase.from("volunteers").select("taluka")

        if (error) {
          console.error("❌ Supabase countByTaluka error:", error)
          throw new Error(`Database count by taluka error: ${error.message}`)
        }

        const counts: Record<string, number> = {}
        data?.forEach((volunteer) => {
          counts[volunteer.taluka] = (counts[volunteer.taluka] || 0) + 1
        })

        console.log("📊 Counting by Taluka in Supabase:", counts)
        return counts
      } catch (error) {
        console.error("💥 Error in countByTaluka:", error)
        throw error
      }
    },

    delete: async (id: string): Promise<void> => {
      try {
        if (useMockDatabase) {
          global.mockVolunteers = global.mockVolunteers || []
          const index = global.mockVolunteers.findIndex((v) => v.id === id)
          if (index > -1) {
            global.mockVolunteers.splice(index, 1)
            console.log("🗑️ Deleted volunteer from mock database:", id)
          }
          return
        }

        const { error } = await supabase.from("volunteers").delete().eq("id", id)

        if (error) {
          console.error("❌ Supabase delete error:", error)
          throw new Error(`Database delete error: ${error.message}`)
        }

        console.log("🗑️ Deleted volunteer from Supabase:", id)
      } catch (error) {
        console.error("💥 Error in delete:", error)
        throw error
      }
    },

    update: async (id: string, data: Partial<Omit<Volunteer, "id" | "created_at">>): Promise<Volunteer> => {
      try {
        if (useMockDatabase) {
          global.mockVolunteers = global.mockVolunteers || []
          const volunteer = global.mockVolunteers.find((v) => v.id === id)
          if (!volunteer) {
            throw new Error("Volunteer not found")
          }
          Object.assign(volunteer, data)
          console.log("✏️ Updated volunteer in mock database:", volunteer.name)
          return volunteer
        }

        const updateData: any = {}

        if (data.name) updateData.name = data.name
        if (data.mobile) updateData.mobile = data.mobile
        if (data.taluka) updateData.taluka = data.taluka
        if (data.age_group) updateData.age_group = data.age_group
        if (data.education) updateData.education = data.education
        if (data.occupation) updateData.occupation = data.occupation
        if (data.prabhag) updateData.prabhag = data.prabhag
        if (data.strengthen_party) updateData.strengthen_party = data.strengthen_party
        if (data.ready_to_join) updateData.ready_to_join = data.ready_to_join

        const { data: volunteer, error } = await supabase
          .from("volunteers")
          .update(updateData)
          .eq("id", id)
          .select()
          .single()

        if (error) {
          console.error("❌ Supabase update error:", error)
          throw new Error(`Database update error: ${error.message}`)
        }

        console.log("✏️ Updated volunteer in Supabase:", volunteer.name)
        return volunteer
      } catch (error) {
        console.error("💥 Error in update:", error)
        throw error
      }
    },
  },
}

export { supabase }
