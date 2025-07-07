import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center p-8 bg-black/60 backdrop-blur-sm rounded-2xl border border-green-500/20 max-w-md mx-4">
        <h1 className="text-6xl font-bold text-green-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-6">
          Sorry, the page you are looking for doesn&apos;t exist.
        </p>
        <Link 
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
