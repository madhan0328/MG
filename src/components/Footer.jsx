import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { PERSONAL } from '../data'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-off">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-ink3 text-sm">
          © {year} {PERSONAL.name}. Built with React & Tailwind CSS.
        </p>

        <div className="flex items-center gap-4">
          <a href={PERSONAL.github}   target="_blank" rel="noreferrer" aria-label="GitHub"   className="text-ink3 hover:text-ink transition-colors"><FiGithub size={18} /></a>
          <a href={PERSONAL.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-ink3 hover:text-ink transition-colors"><FiLinkedin size={18} /></a>
          <a href={`mailto:${PERSONAL.email}`}                         aria-label="Email"    className="text-ink3 hover:text-ink transition-colors"><FiMail size={18} /></a>
        </div>
      </div>
    </footer>
  )
}
