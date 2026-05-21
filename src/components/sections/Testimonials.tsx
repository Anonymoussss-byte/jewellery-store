"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amara V.",
    role: "Private collector",
    quote:
      "The finishing is extraordinary. The piece moves like fabric and still has the authority of sculpture.",
    rating: "5.0"
  },
  {
    name: "Julian R.",
    role: "Anniversary commission",
    quote:
      "Their concierge team translated a difficult brief into something elegant, personal, and technically perfect.",
    rating: "5.0"
  },
  {
    name: "Selene M.",
    role: "High jewelry client",
    quote:
      "The light performance is what stayed with me. It feels quiet in the hand and cinematic in the room.",
    rating: "4.9"
  }
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-100">Client letters</p>
          <h2 className="font-display mt-3 text-4xl leading-tight text-diamond-100 sm:text-6xl">
            Quiet praise from rooms where details matter.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              data-reveal
              key={testimonial.name}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="diamond-panel rounded-2xl p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <Quote className="h-8 w-8 text-gold-200/70" />
                <div className="flex items-center gap-1 text-xs text-gold-100">
                  <Star className="h-4 w-4 fill-gold-300 text-gold-300" />
                  {testimonial.rating}
                </div>
              </div>
              <p className="text-lg leading-8 text-diamond-100/84">{testimonial.quote}</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <h3 className="font-display text-2xl text-diamond-100">{testimonial.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-diamond-300/58">
                  {testimonial.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
