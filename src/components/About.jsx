import { motion } from 'framer-motion'
import { FiMapPin } from 'react-icons/fi'
import { PERSONAL } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// Fidelity green: #4CAF50 / their brand green is closer to #00A550
const FIDELITY_GREEN = '#00A550'

function OpenToWorkBadge() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {/* Pulsing dot */}
      <span className="relative flex h-2 w-2">
        <motion.span
          animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inline-flex h-full w-full rounded-full"
          style={{ backgroundColor: FIDELITY_GREEN }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: FIDELITY_GREEN }}
        />
      </span>

      {/* Text with shimmer */}
      <motion.span
        animate={{ opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-sm font-semibold"
        style={{ color: FIDELITY_GREEN }}
      >
        Open to work
      </motion.span>
    </span>
  )
}

const STATS = [
  { label: 'Focus',      value: 'SDET & Data Engineer' },
  { label: 'Experience', value: '1+ Years' },
  { label: 'Location',   value: PERSONAL.location },
  { label: 'Status',     value: PERSONAL.available ? 'open-to-work' : 'Unavailable' },
]

export default function About() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="about" className="section">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        className="container mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h2 className="section-heading">About</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Copy */}
          <motion.div variants={itemVariants} className="space-y-4 text-ink2 text-base leading-relaxed">
            <p>
              I'm a QA engineer based in{' '}
              <span className="inline-flex items-center gap-1 text-ink font-medium">
                <FiMapPin className="shrink-0" />
                {PERSONAL.location}
              </span>
              . I'm passionate about writing clean code and building things that are both fast and reliable.
            </p>
            <p>
              My QA background means I approach every feature I build by thinking about edge cases first, which leads to fewer bugs and more confidence at every release.
            </p>
            <p>
              When I'm not writing code or test plans, you'll find me exploring UI design, contributing to open source, or reading about software craft.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <dl className="grid grid-cols-2 gap-4">
            {STATS.map(({ label, value }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                className="card p-4 bg-surface-2 rounded-lg border border-border"
              >
                <dt className="text-xs text-ink3 uppercase tracking-wider mb-1 font-semibold">
                  {label}
                </dt>
                <dd className="text-ink font-medium text-sm">
                  {value === 'open-to-work' ? <OpenToWorkBadge /> : value}
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  )
}