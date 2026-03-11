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
    id: "engine-detailing",
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
    <section className="py-12 px-4 bg-gray-900 text-white">
      <div className="relative w-full overflow-hidden px-10">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          className="w-full"
        >
          {serviceCards.map((card) => (
            <SwiperSlide key={card.id}>
              <motion.div
                className="bg-gray-800 rounded-xl p-6 h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">
                  {card.title}
                </h3>
                <ul className="space-y-2">
                  {card.services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-gray-300">
                      <Check className="text-green-400 w-4 h-4 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 active:bg-white/50 rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 active:bg-white/50 rounded-full p-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </section>
  )
}
