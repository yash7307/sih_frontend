import React from 'react';

export default function PMFooter() {
  return (
    <footer id="support" className="bg-gray-900 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Logos */}
          <div>
            <div className="flex gap-2 mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800">MCA</span>
              </div>
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded flex items-center justify-center">
                <span className="text-xs font-bold">BISAG-N</span>
              </div>
            </div>
            <h3 className="font-bold mb-4 text-sm md:text-base">Social Media</h3>
            <div className="flex gap-3">
              <button className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded-full flex items-center justify-center text-sm md:text-base">📺</button>
              <button className="w-8 h-8 md:w-10 md:h-10 bg-pink-600 rounded-full flex items-center justify-center text-sm md:text-base">📷</button>
              <button className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm md:text-base">in</button>
              <button className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-full flex items-center justify-center text-sm md:text-base">𝕏</button>
            </div>
          </div>

          {/* Get to Know */}
          <div>
            <h3 className="font-bold mb-4 text-sm md:text-base">Get to Know</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <a href="#" className="hover:text-orange-500">
                  Partner Companies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Manuals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Videos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold mb-4 text-sm md:text-base">Contact Us</h3>
            <p className="text-xs md:text-sm mb-4">A Wing, 5th Floor, Shastri Bhawan, Dr Rajendra Prasad Rd, New Delhi-110001</p>
            <p className="text-xs md:text-sm mb-2">pminternship[at]mca.gov.in</p>
            <p className="text-base md:text-lg font-bold">1800 11 6090</p>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-bold mb-4 text-sm md:text-base">Download Mobile App</h3>
            <p className="text-xs md:text-sm mb-4">
              Click the button below to download the app or scan the QR code with your phone.
            </p>
            <button className="w-full bg-orange-500 text-white py-2 md:py-3 rounded font-semibold mb-2 hover:bg-orange-600 text-xs md:text-sm">
              GET IT ON Google Play
            </button>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded p-2">
              <div className="w-full h-full bg-orange-300 flex items-center justify-center text-xs">QR</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs md:text-sm">
          <p>&copy; 2025 PMIS. All rights reserved.</p>
          <p className="text-gray-400">Build Version: 1759578763123</p>
        </div>
      </div>
    </footer>
  )
}