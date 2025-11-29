export default function DashboardSection() {
  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-16">
          <span className="text-orange-500">—</span> Dashboard <span className="text-orange-500">—</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-100 rounded mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl md:text-6xl">🗺️</span>
            </div>
            <p className="text-center text-gray-600 text-xs md:text-sm">India Map showing internship opportunities</p>
          </div>

          <div className="bg-gradient-to-br from-blue-100 to-pink-100 p-6 md:p-8 rounded-lg">
            <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">118K+</div>
            <p className="text-lg md:text-xl font-semibold text-gray-800">Internship Opportunities</p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-1">
            <div className="bg-blue-100 p-4 md:p-6 rounded-lg text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-900">25</div>
              <p className="text-xs md:text-sm text-gray-700">States</p>
            </div>
            <div className="bg-green-100 p-4 md:p-6 rounded-lg text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-900">36</div>
              <p className="text-xs md:text-sm text-gray-700">Sectors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
