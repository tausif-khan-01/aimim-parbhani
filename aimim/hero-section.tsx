import Image from "next/image";

export default function AIMIMHero() {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/aimim-rally.jpg"
          alt="AIMIM Rally"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-black/60" /> */}
      </div>

      <div className="relative z-10 container    text-center bg-black/50  p-1 rounded-xl flex">
        {/* Main Heading */}
        <div className="flex flex-col p-2 mx-auto">
          <h1 className="text-5xl flex gap-2  font-bold text-white mb-6 drop-shadow-2xl">
            <span> AIMIM</span>
            <span className="block text-green-400">Parbhani</span>
          </h1>
          <div className="inline-block  bg-green-600/90 text-white px-8 py-3 rounded-full font-semibold text-xl mb-8 backdrop-blur-sm">
            Coming Soon
          </div>
        </div>
        {/* Coming Soon Badge */}

        {/* Description */}

        {/* Urdu Text */}
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 w-2 h-32 bg-green-600 opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-32 h-2 bg-green-600 opacity-50"></div>
    </section>
  );
}
