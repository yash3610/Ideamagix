import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"

const serviceCards = [
  {
    id: "engine",
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
    id: "exterior",
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
    id: "interior",
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
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Premium Car Detailing
        </h2>

        {/* Outer wrapper: overflow-hidden prevents slides from overflowing the viewport on mobile */}
        <div className="relative overflow-hidden">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper
            }}
            className="w-full pb-2"
          >
            {serviceCards.map((card, index) => (
              <SwiperSlide key={card.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 rounded-2xl p-6 h-full border border-gray-700 hover:border-yellow-500 transition-colors duration-300"
                >
                  <h3 className="text-xl font-bold text-yellow-400 mb-6 text-center">
                    {card.title}
                  </h3>
                  <ul className="space-y-3">
                    {card.services.map((service, serviceIndex) => (
                      <li
                        key={serviceIndex}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <Check className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons — positioned outside the swiper overflow area */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full p-2 shadow-lg transition-colors duration-200 -translate-x-1/2 hidden sm:flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full p-2 shadow-lg transition-colors duration-200 translate-x-1/2 hidden sm:flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile navigation buttons — shown below the slider on small screens */}
        <div className="flex justify-center gap-4 mt-6 sm:hidden">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full p-3 shadow-lg transition-colors duration-200 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-full p-3 shadow-lg transition-colors duration-200 flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
