import { useState, useEffect } from 'react'
import { NAV_LINKS, PERSONAL } from '../data'

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('')

  // ── shadow on scroll ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── highlight active section ──────────────────────────────────
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace('#', ''))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`)
        })
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // ── close mobile menu on link click ──────────────────────────
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-off/95 backdrop-blur-sm shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 font-serif text-xl text-ink hover:text-ink2 transition-colors"
        >
    
          <span className="hidden sm:inline font-serif text-base font-semibold">
            {PERSONAL.name.split(' ')[0].concat(PERSONAL.lastname)}
            
          </span>
        </a>


        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link ${activeLink === link.href ? 'active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#contact" className="hidden md:inline-flex btn-primary text-sm">
          Hire me
        </a>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-ink transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-off border-b border-border px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link text-base block"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn-primary mt-6 w-full justify-center" onClick={handleLinkClick}>
            Hire me
          </a>
        </div>
      )}
    </header>
  )
}
