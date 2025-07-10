import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AIMIMHero() {
  return (
    <>
      <section className="relative grid grid-cols-1 md:grid-cols-2 bg-white text-gray-800">
        {/* Right Video */}
        <div className="relative min-h-[50vh] md:min-h-screen overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            loop
            playsInline
            autoPlay
            poster=""
          >
            <source src="/video/join_aimim.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Left Content */}
        <div className="z-10 relative flex flex-col justify-center px-6 py-8 bg-white/80 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto text-center md:text-left">
            {/* Logo */}
            <div className="mb-2">
              <Image
                src="/aimim-logo.png"
                alt="AIMIM Logo"
                className="w-16 h-16 md:w-32 md:h-32"
                width={128}
                height={128}
                priority
              />
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
              AIMIM
              <span className="block text-green-700 text-4xl md:text-5xl">
                Parbhani
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6">
              All India Majlis-e-Ittehadul Muslimeen
            </p>

            <p className="text-md md:text-lg text-gray-600 mb-8 leading-relaxed">
              Join the movement for Liberty, Equality, Fraternity and Justice.
              Be a part of AIMIM Parbhani&apos;s mission by serving the
              community and building a better tomorrow.
            </p>

            <Link
              href="http://volunteer.mimparbhani.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white rounded-full bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-md"
            >
              Join AIMIM Parbhani as Volunteer
            </Link>

            {/* Urdu & English Quote */}
            <div className="mt-10 mb-2">
              <p
                className="text-green-700 text-xl md:text-2xl font-bold"
                dir="rtl"
              >
                اتحاد، مساوات، بھائی چارہ، انصاف
              </p>
              <p className="text-gray-700 text-lg md:text-xl mt-2">
                Liberty, Equality, Fraternity, Justice
              </p>
            </div>

            {/* Social Icons */}
            <div className="p-2 space-x-2">
              {[
                {
                  href: "https://www.instagram.com/m.ghaus",
                  icon: <Instagram className="w-6 h-6" />,
                  bg: "bg-pink-500",
                },
                {
                  href: "https://www.facebook.com/mdgouse04",
                  icon: <Facebook className="w-6 h-6 text-white" />,
                  bg: "bg-blue-700",
                },
              ].map(({ href, icon, bg }, index) => (
                <Link
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center justify-center p-2 rounded-full text-white transition transform hover:scale-110 ${bg}`}
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-4 left-4 w-2 h-28 bg-green-500/60 rounded-full" />
        <div className="absolute bottom-4 right-4 w-28 h-2 bg-green-500/60 rounded-full" />
      </section>
    </>
  );
}
