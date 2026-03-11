"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const serviceCards = [
  {
    id: "engine-care",
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
    id: "exterior-care",
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
    id: "interior-care",
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
    id: "protection",
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
  const swiperRef = useRef(null)

  return (
    <section className="w-full overflow-hidden bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center mb-8">
          Premium Car Detailing Services
        </h2>

        <div className="relative">
          {/* Custom Prev Button */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Swiper Container */}
          <div className="mx-8">
            <Swiper
              modules={[Navigation]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
              }}
              className="w-full"
            >
              {serviceCards.map((card) => (
                <SwiperSlide key={card.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-gray-800 rounded-2xl p-6 h-full"
                  >
                    <h3 className="text-white text-lg font-semibold mb-4">
                      {card.title}
                    </h3>
                    <ul className="space-y-2">
                      {card.services.map((service) => (
                        <li
                          key={service}
                          className="flex items-center gap-2 text-gray-300 text-sm"
                        >
                          <Check className="w-4 h-4 text-green-400 shrink-0" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Custom Next Button */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
