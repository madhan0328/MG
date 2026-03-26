import { motion } from 'framer-motion'
import { INTERESTS } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Interests() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="interests" className="section">
      <h2 className="section-heading">Interests</h2>
      <div className="section-divider" />

      <div ref={ref} className="flex flex-wrap gap-3">
        {INTERESTS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: i * 0.07, ease: 'backOut' }}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-border
                       bg-white text-ink text-sm font-medium
                       hover:bg-ink hover:text-white hover:border-ink
                       transition-all duration-200 cursor-default"
          >
            <span role="img" aria-label={item.label}>{item.emoji}</span>
            {item.label}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
