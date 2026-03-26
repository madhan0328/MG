import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiArrowDown, FiInstagram } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { PERSONAL } from '../data'
import img1 from '../Logo/4.jpeg'
import img2 from '../Logo/8.jpeg'

// ── Framer Motion variants ─────────────────────────────────────────
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

const IMAGES = [img1, img2]
const INTERVAL = 3500 // ms between crossfades

// ── Floating stat card ─────────────────────────────────────────────
function StatCard({ label, value, className = '' }) {
  return (
    <div className={`bg-white border border-border rounded-2xl px-5 py-3 shadow-sm ${className}`}>
      <p className="text-2xl font-serif text-ink">{value}</p>
      <p className="text-xs text-ink3 mt-0.5">{label}</p>
    </div>
  )
}

// ── Crossfade image cycler ─────────────────────────────────────────
function CrossfadePhoto({ name }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-border shadow-md bg-off2">
      <AnimatePresence mode="crossfade">
        <motion.img
          key={index}
          src={IMAGES[index]}
          alt={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 pb-10 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background texture */}
      <div
        aria-hidden
        className="absolute inset-0 bg-off pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(29,78,216,0.04) 0%, transparent 60%), ' +
            'radial-gradient(circle at 80% 20%, rgba(16,196,122,0.05) 0%, transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

        {/* ── Left copy ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {/* Available badge */}
          {PERSONAL.available && (
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
              </span>
              <span className="text-sm text-green font-medium">Available for QA opportunities</span>
            </motion.div>
          )}

          {/* Name */}
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-tight mb-4">
            Hi, I'm <br />
            <em>{PERSONAL.name}</em>
          </motion.h1>

          {/* Role */}
          <motion.p variants={fadeUp} className="text-ink3 text-lg font-medium mb-6">
            {PERSONAL.role}
          </motion.p>

          {/* Bio */}
          <motion.p variants={fadeUp} className="text-ink2 text-base leading-relaxed max-w-md mb-8">
            {PERSONAL.bio}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3 mb-10">

            <a href="/resume.pdf" download="MadhanGokul.pdf" className="btn-primary">
              Resume
            </a>

            <a href="#experience" className="btn-ghost">
              View Experience
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className="flex items-center gap-4">
            <a href={PERSONAL.github} target="_blank" rel="noreferrer" aria-label="GitHub"
              className="p-2 text-ink3 hover:text-ink transition-colors"><FiGithub size={20} /></a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="p-2 text-ink3 hover:text-ink transition-colors"><FiLinkedin size={20} /></a>
            <a href={`mailto:${PERSONAL.email}`} aria-label="Email"
              className="p-2 text-ink3 hover:text-ink transition-colors"><FiMail size={20} /></a>
            <a href={PERSONAL.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
              className="p-2 text-ink3 hover:text-ink transition-colors"><FiInstagram size={20} /></a>
            <a href={`https://wa.me/${PERSONAL.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"
              className="p-2 text-ink3 hover:text-green transition-colors"><FaWhatsapp size={20} /></a>
          </motion.div>
        </motion.div>

        {/* ── Right: photo + floating cards ── */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="show"
          className="relative flex justify-center"
        >
          <CrossfadePhoto name={PERSONAL.name} />

          {/* Floating cards */}
          <StatCard
            label="Years of experience"
            value="1.5+"
            className="absolute -left-6 top-8 animate-float"
          />
          <StatCard
            label="Automation Engineer"
            value="QA"
            className="absolute -right-4 bottom-10 animate-float-slow"
          />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-ink3 hover:text-ink transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <FiArrowDown size={16} className="animate-bounce" />
      </motion.a>
    </section>
  )
}