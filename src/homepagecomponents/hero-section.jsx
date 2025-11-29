import React from 'react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-6 md:gap-12 items-center">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Accepted the Offer</h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">But not Joined yet?</h3>
          <div className="bg-orange-500 inline-block px-4 md:px-6 py-2 rounded font-italic mb-4 md:mb-6 text-sm md:text-base">
            Don't worry-the window is still open!
          </div>
          <p className="text-base md:text-lg mb-6 md:mb-8">
            Reach out to the company that made you the offer. contact details are in your offer letter.
          </p>
          <button className="bg-orange-500 text-white px-6 md:px-8 py-3 md:py-4 rounded font-bold text-base md:text-lg hover:bg-orange-600 transition w-full md:w-auto">
            Reach Out Now
          </button>
        </div>
        <div className="flex-1 w-full md:w-auto">
          <div className="w-full h-60 md:h-80 bg-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-4xl md:text-6xl">👔</span>
          </div>
        </div>
      </div>
    </section>
  )
}
