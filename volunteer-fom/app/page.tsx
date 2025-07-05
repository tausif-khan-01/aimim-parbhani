import Image from "next/image"
import { VolunteerForm } from "@/components/volunteer-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-4">
            <Image
              src="/aimim-logo.png"
              alt="AIMIM Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 hidden md:block">
                ALL INDIA MAJLIS-E-ITTEHADUL MUSLIMEEN
              </h1>
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 block md:hidden">
               AIMIM
              </h1>
              <p className="text-lg text-gray-600">PARBHANI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
    <div className="relative h-20 sm:h-48 md:h-64 overflow-hidden">
        <Image
          src="/aimim-banner.png"
          alt="AIMIM Parbhani Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Volunteer Registration Form</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join AIMIM Parbhani as a volunteer and help us strengthen our community. Fill out the form below to register
            and connect with your local Taluka group.
          </p>
        </div>

        <VolunteerForm />
      </main>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Image src="/images/aimim-logo.png" alt="AIMIM Logo" width={40} height={40} className="rounded-full" />
            <h4 className="text-xl font-semibold">AIMIM Parbhani</h4>
          </div>
          <p className="text-green-100">All India Majlis-e-Ittehadul Muslimeen - Working for the Community</p>
        </div>
      </footer>
    </div>
  )
}
