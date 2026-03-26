import { motion } from 'framer-motion'
import { SKILLS } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const g = item[key]
    acc[g] = acc[g] ? [...acc[g], item] : [item]
    return acc
  }, {})
}

export default function Skills() {
  const { ref, isVisible } = useScrollReveal()
  const groups = groupBy(SKILLS, 'group')

  return (
    <section id="skills" className="section">
      <h2 className="section-heading">Skills</h2>
      <div className="section-divider" />

      <div className="space-y-10">
        {Object.entries(groups).map(([group, skills], gi) => (
          <div key={group}>
            <h3 className="text-xs uppercase tracking-widest text-ink3 mb-4">{group}</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  ref={i === 0 ? ref : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: gi * 0.15 + i * 0.06, ease: 'easeOut' }}
                  className="group relative overflow-hidden border border-border rounded-2xl p-5 cursor-default transition-all duration-300"
                >
                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ backgroundColor: '#5ee197' }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    <p className="font-medium text-sm text-ink group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}