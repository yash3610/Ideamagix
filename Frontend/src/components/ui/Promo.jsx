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
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Our Premium Services
        </h2>

        {/* Slider wrapper with overflow-hidden to prevent cards from escaping on mobile */}
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!overflow-hidden"
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {serviceCards.map((card) => (
              <SwiperSlide key={card.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md p-6 h-full"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.services.map((service) => (
                      <li
                        key={service}
                        className="flex items-center gap-2 text-gray-600"
                      >
                        <Check className="w-4 h-4 text-green-500 shrink-0" />
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons wired directly to the swiper instance
              so they work reliably on all screen sizes including mobile */}
          <button
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                       bg-white rounded-full shadow-lg p-2 hover:bg-gray-100
                       focus:outline-none focus:ring-2 focus:ring-gray-300
                       sm:-translate-x-5"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <button
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                       bg-white rounded-full shadow-lg p-2 hover:bg-gray-100
                       focus:outline-none focus:ring-2 focus:ring-gray-300
                       sm:translate-x-5"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  )
}
