export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
        <h2 className="text-xl font-semibold text-white mb-2">Loading AIMIM Parbhani</h2>
        <p className="text-gray-300">Please wait...</p>
      </div>
    </div>
  )
}
