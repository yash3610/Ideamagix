import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

const serviceCards = [
  {
    title: "Our Premium Services",
    services: [
      "Engine Cleaning",
      "Dirt Removal",
      "Snow Polishing",
      "Nano Coating",
      "Interior Detailing",
      "Advanced Polish",
    ],
  },
  {
    title: "Our Premium Services",
    services: [
      "Full Exterior Wash",
      "High Pressure Foam",
      "Wheel Cleaning",
      "Glass Polishing",
      "Scratch Removal",
      "Wax Protection",
    ],
  },
  {
    title: "Our Premium Services",
    services: [
      "Deep Interior Vacuum",
      "Leather Conditioning",
      "Dashboard Polish",
      "AC Vent Cleaning",
      "Odor Removal",
      "Seat Shampoo",
    ],
  },
  {
    title: "Our Premium Services",
    services: [
      "Ceramic Coating",
      "Paint Protection",
      "UV Shield",
      "Water Repellent",
      "Gloss Finish",
      "Long Term Protection",
    ],
  },
]

export function Promo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef(null)

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? serviceCards.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === serviceCards.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext()
      else handlePrev()
    }
    touchStartX.current = null
  }

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  }

  return (
    <section className="w-full py-12 px-4 bg-gray-50">
      <div className="relative max-w-md mx-auto sm:max-w-xl md:max-w-2xl">
        {/* Slide area */}
        <div
          className="overflow-hidden rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
                  {serviceCards[currentIndex].title}
                </h2>
                <ul className="space-y-3">
                  {serviceCards[currentIndex].services.map((service) => (
                    <li key={service} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons — inside the container width to stay on screen */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {serviceCards.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Promo
