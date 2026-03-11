import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"

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
    id: "wash-polish",
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
    id: "interior-detail",
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
    <section className="relative w-full overflow-hidden py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Slider wrapper — overflow-hidden keeps cards inside the viewport */}
        <div className="relative overflow-hidden">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full"
          >
            {serviceCards.map((card, index) => (
              <SwiperSlide key={card.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-900 rounded-2xl p-6 h-full"
                >
                  <h3 className="text-yellow-400 text-xl font-bold mb-4">
                    {card.title}
                  </h3>
                  <ul className="space-y-2">
                    {card.services.map((service) => (
                      <li key={service} className="flex items-center gap-2 text-white">
                        <Check className="text-yellow-400 w-4 h-4 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation buttons — rendered below the slider and always visible */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="bg-white/20 hover:bg-white/40 active:bg-white/60 rounded-full p-3 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="bg-white/20 hover:bg-white/40 active:bg-white/60 rounded-full p-3 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
