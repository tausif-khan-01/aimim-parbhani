import Image from "next/image";
import Link from "next/link";

export default function AIMIMHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/aimim-rally.jpg"
          alt="AIMIM Parbhani Rally - All India Majlis-e-Ittehadul Muslimeen"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-sm p-8 rounded-2xl border border-green-500/20">
          {/* Main Heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            <span className="block">AIMIM</span>
            <span className="block text-green-400 text-5xl md:text-6xl lg:text-7xl">Parbhani</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-medium">
            All India Majlis-e-Ittehadul Muslimeen
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the movement for justice, equality, and progress. Be a part of AIMIM Parbhani&apos;s mission to serve the community and build a better tomorrow.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="http://volunteer.mimparbhani.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-xl min-w-[280px]"
            >
              <span className="relative z-10">Join AIMIM Parbhani as Volunteer</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </Link>
            
            <div className="inline-block bg-green-600/90 text-white px-6 py-3 rounded-full font-semibold text-lg backdrop-blur-sm border border-green-500/30">
              Coming Soon: More Updates
            </div>
          </div>
          
          {/* Urdu Text */}
          <div className="mt-8 text-right">
            <p className="text-2xl md:text-3xl text-green-300 font-bold" dir="rtl">
              اتحاد، ترقی، انصاف
            </p>
            <p className="text-lg text-gray-300 mt-2">Unity, Progress, Justice</p>
          </div>
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 w-2 h-32 bg-green-600 opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-32 h-2 bg-green-600 opacity-50"></div>
    </section>
  );
}
