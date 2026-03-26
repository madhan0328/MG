import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { EXPERIENCE } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

function CompanyLogo({ logo, company }) {
  const [imgError, setImgError] = useState(false)

  if (!logo || imgError) {
    const initials = company.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    return (
      <div className="w-10 h-10 rounded-lg bg-ink3/10 flex items-center justify-center shrink-0 text-xs font-bold text-ink3">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={logo}
      alt={`${company} logo`}
      onError={() => setImgError(true)}
      className="w-10 h-10 rounded-lg object-contain bg-white border border-ink3/10 p-1 shrink-0"
    />
  )
}

function ExperienceCard({ item, index }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="card"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
        {/* Logo + Role */}
        <div className="flex items-start gap-3">
          <CompanyLogo logo={item.logo} company={item.company} />
          <div>
            <h3 className="font-semibold text-ink text-lg leading-tight">{item.role}</h3>
            <p className="text-ink3 text-sm">{item.company}</p>
          </div>
        </div>

        {/* Period + Location */}
        <div className="flex flex-col sm:items-end gap-1 text-xs text-ink3 shrink-0">
          <span className="flex items-center gap-1"><FiCalendar size={12} />{item.period}</span>
          <span className="flex items-center gap-1"><FiMapPin size={12} />{item.location}</span>
        </div>
      </div>

      {/* Bullet points */}
      <ul className="space-y-2 mb-4">
        {item.points.map((point, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink2 leading-relaxed">
            <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-ink3" />
            {point}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section bg-off2 rounded-3xl">
      <h2 className="section-heading">Experience</h2>
      <div className="section-divider" />

      <div className="flex flex-col gap-6">
        {EXPERIENCE.map((item, index) => (
          <ExperienceCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}