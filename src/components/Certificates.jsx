// Certificates.jsx — fully self-contained (images from /src/assets/Certificates/)

const images = import.meta.glob('/src/Certificates/*.jpg', { eager: true })

const getImg = (filename) => images[`/src/Certificates/${filename}`]?.default

const CERTIFICATES = [
  { title: "ISTQB Foundation Level", issuer: "Indian Testing Board",    year: "2023", image: getImg("istqb.jpg") },
//  { title: "React Developer",         issuer: "Meta",      year: "2025", image: getImg("react.jpg") },
  { title: "Snowpro Platform",            issuer: "Snowflake",    year: "2026", image: getImg("Snow.jpg") },
  // 👆 Replace with your actual filenames
]

const REPEAT_MIN = 8

function CertCard({ cert }) {
  return (
    <div className="flex-shrink-0 w-72 card mx-4 group/card">
      <div className="w-full h-40 rounded-xl overflow-hidden bg-off2 mb-4 border border-border relative">
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-ink3 bg-off2">
            <span className="text-xs uppercase tracking-widest font-semibold">Certificate</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="space-y-1">
        <h3 className="font-semibold text-ink text-base leading-snug">{cert.title}</h3>
        <div className="flex items-center gap-2 text-xs text-ink3 uppercase tracking-wider font-medium">
          <span>{cert.issuer}</span>
          <span className="w-1 h-1 rounded-full bg-ink3/50" />
          <span>{cert.year}</span>
        </div>
      </div>
    </div>
  )
}

export default function Certificates() {
  const fillCount = Math.ceil(REPEAT_MIN / Math.max(CERTIFICATES.length, 1))
  const seamlessList = Array(fillCount).fill(CERTIFICATES).flat()

  return (
    <section id="certificates" className="py-24 overflow-hidden bg-off2 rounded-3xl">
      <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto mb-12">
        <h2 className="section-heading">Certifications</h2>
        <div className="section-divider" />
      </div>

      <div className="relative flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-off2 to-transparent pointer-events-none" />

        <div className="flex animate-marquee hover:pause-marquee py-4" aria-hidden="true">
          {seamlessList.map((cert, i) => (
            <CertCard key={`track2-${i}`} cert={cert} />
          ))}
        </div>

      </div>
    </section>
  )
}