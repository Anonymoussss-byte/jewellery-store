"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Instagram, Mail, MapPin, Phone, Send, Sparkles, ChevronDown } from "lucide-react";

export function SiteFooter() {
  const [newsletterStatus, setNewsletterStatus] = useState("");
  const [contactStatus, setContactStatus] = useState("");
  const [interest, setInterest] = useState("High jewelry appointment");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNewsletterStatus("You are on the private list.");
    event.currentTarget.reset();
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactStatus("Concierge request received.");
    event.currentTarget.reset();
  };

  return (
    <footer id="contact" className="relative border-t border-white/10 bg-black/55 py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div data-reveal>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold-300/25 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-gold-100">
            <Sparkles className="h-4 w-4" />
            Aurelia private concierge
          </div>
          <h2 className="font-display text-4xl leading-tight text-diamond-100 sm:text-6xl">
            Begin with a question. Leave with a piece of light.
          </h2>
          <div className="mt-8 space-y-4 text-sm text-diamond-200/70">
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gold-200" />
              18 Place Vendome, Paris atelier by appointment
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold-200" />
              +1 (212) 555-0188
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold-200" />
              concierge@aureliamaison.example
            </p>
          </div>

          <form onSubmit={submitNewsletter} className="mt-10 max-w-xl">
            <label htmlFor="newsletter-email" className="text-xs uppercase tracking-[0.24em] text-diamond-300/62">
              Newsletter
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="private.client@email.com"
                className="min-h-12 flex-1 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm text-diamond-100 placeholder:text-diamond-300/38"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold-200 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-gold-100"
              >
                Join
                <Send className="h-4 w-4" />
              </button>
            </div>
            {newsletterStatus && (
              <p className="mt-3 flex items-center gap-2 text-sm text-gold-100">
                <CheckCircle2 className="h-4 w-4" />
                {newsletterStatus}
              </p>
            )}
          </form>
        </div>

        <div data-reveal className="glass-panel rounded-2xl p-6 sm:p-8">
          <h3 className="font-display text-3xl text-diamond-100">Concierge Form</h3>
          <form onSubmit={submitContact} className="mt-6 grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder="Name"
                className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-4 text-sm text-diamond-100 placeholder:text-diamond-300/38"
              />
              <input
                name="phone"
                placeholder="Phone"
                className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-4 text-sm text-diamond-100 placeholder:text-diamond-300/38"
              />
            </div>
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="min-h-12 rounded-xl border border-white/12 bg-black/25 px-4 text-sm text-diamond-100 placeholder:text-diamond-300/38"
            />
            <div className="relative">
              <input type="hidden" name="interest" value={interest} />
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full min-h-12 items-center justify-between rounded-xl border border-white/12 bg-black/25 px-4 text-sm text-diamond-100 focus:border-gold-300/50 focus:outline-none"
              >
                {interest}
                <ChevronDown className={`h-4 w-4 text-gold-300/70 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/12 bg-[#050505] shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
                  {["High jewelry appointment", "Engagement ring consultation", "Watch and bracelet styling", "Private commission"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setInterest(opt);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm transition-colors ${interest === opt ? 'bg-gold-300/10 text-gold-100' : 'text-diamond-100 hover:bg-white/5 hover:text-white'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us what you are looking for."
              className="rounded-xl border border-white/12 bg-black/25 px-4 py-3 text-sm text-diamond-100 placeholder:text-diamond-300/38"
            />
            <button
              type="submit"
              className="shine-sweep inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-gold-200 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black shadow-glow transition hover:bg-gold-100"
            >
              Send Request
              <Send className="h-4 w-4" />
            </button>
            {contactStatus && (
              <p className="flex items-center gap-2 text-sm text-gold-100">
                <CheckCircle2 className="h-4 w-4" />
                {contactStatus}
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-5 border-t border-white/10 px-4 pt-8 text-xs uppercase tracking-[0.2em] text-diamond-300/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Aurelia Maison. Fine jewelry atelier.</p>
        <div className="flex items-center gap-4">
          <a className="transition hover:text-gold-100" href="https://instagram.com" aria-label="Aurelia on Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a className="transition hover:text-gold-100" href="mailto:concierge@aureliamaison.example" aria-label="Email Aurelia concierge">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
