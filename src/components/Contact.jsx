import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiSend, FiCheck, FiAlertCircle, FiPhone, FiMail, FiClock, FiChevronDown } from 'react-icons/fi'
import { PERSONAL } from '../data'
import useScrollReveal from '../hooks/useScrollReveal'

// ── EmailJS config ─────────────────────────────────────────────────
const EJS = {
  serviceId:   'service_ya7rnom',
  templateId:  'template_amkcr8s',  // Template 1 → comes to YOU
  autoReplyId: 'template_75uqrnb',  // Template 2 → goes to SENDER ← paste your new template ID here
  publicKey:   'Lzkjt2nUrVsSC7ZO2',
}

const INITIAL_FORM = { from_name: '', from_email: '', phone: '', subject: '', message: '' }
const MESSAGE_LIMIT = 500

function validateEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}
function validatePhone(val) {
  return /^[+]?[\d\s\-().]{7,15}$/.test(val)
}

function FieldError({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="flex items-center gap-1 text-red-500 text-xs mt-1.5 overflow-hidden"
        >
          <FiAlertCircle size={11} /> {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function InfoRow({ icon: Icon, label, value, href, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="flex items-start gap-3"
    >
      <div className="mt-0.5 p-2 rounded-lg bg-off2 border border-border text-ink3 shrink-0">
        <Icon size={15} />
      </div>
      <div>
        <p className="text-xs text-ink3 uppercase tracking-wider mb-0.5">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-ink font-medium hover:text-accent transition-colors duration-200">
            {value}
          </a>
        ) : (
          <p className="text-sm text-ink font-medium">{value}</p>
        )}
      </div>
    </motion.div>
  )
}

function SuccessPopup({ onDone }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85, y: 40 }}
      transition={{ duration: 0.4, ease: 'backOut' }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50
                 flex items-start gap-4 px-6 py-4 rounded-2xl shadow-xl
                 bg-white border border-border w-[90vw] max-w-sm overflow-hidden"
    >
      <div className="shrink-0 w-9 h-9 rounded-full bg-green/10 flex items-center justify-center mt-0.5">
        <FiCheck size={18} className="text-green" />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink mb-0.5">Message sent! 🎉</p>
        <p className="text-xs text-ink3 leading-relaxed">
          Thanks for reaching out! I'll connect with you as soon as possible.
        </p>
      </div>
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 4, ease: 'linear' }}
        onAnimationComplete={onDone}
        style={{ transformOrigin: 'left' }}
        className="absolute bottom-0 left-0 h-0.5 w-full bg-green rounded-full"
      />
    </motion.div>
  )
}

export default function Contact() {
  const { ref, isVisible } = useScrollReveal()
  const formRef = useRef(null)

  const [form, setForm]       = useState(INITIAL_FORM)
  const [errors, setErrors]   = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus]   = useState('idle')

  const msgLen = form.message.length

  function validateField(name, value) {
    switch (name) {
      case 'from_name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters.' : ''
      case 'from_email':
        return !validateEmail(value) ? 'Please enter a valid email address.' : ''
      case 'phone':
        return value && !validatePhone(value) ? 'Please enter a valid phone number.' : ''
      case 'subject':
        return !value ? 'Please select a subject.' : ''
      case 'message':
        return value.trim().length < 10
          ? 'Message must be at least 10 characters.'
          : value.length > MESSAGE_LIMIT
          ? `Message cannot exceed ${MESSAGE_LIMIT} characters.`
          : ''
      default:
        return ''
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'message' && value.length > MESSAGE_LIMIT) return
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fields = ['from_name', 'from_email', 'phone', 'subject', 'message']
    const newErrors = {}
    const newTouched = {}
    fields.forEach((f) => {
      newTouched[f] = true
      newErrors[f] = validateField(f, form[f] ?? '')
    })
    setTouched(newTouched)
    setErrors(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setStatus('sending')

    // Build params — used for BOTH templates
    const templateParams = {
      from_name:  form.from_name,
      from_email: form.from_email,
      phone:      form.phone || 'Not provided',
      subject:    form.subject,
      message:    form.message,
      time:       new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }

    try {
      // 1️⃣ Send to YOU
      await emailjs.send(EJS.serviceId, EJS.templateId, templateParams, EJS.publicKey)

      // 2️⃣ Auto-reply to SENDER
      await emailjs.send(EJS.serviceId, EJS.autoReplyId, templateParams, EJS.publicKey)

      setStatus('success')
      setForm(INITIAL_FORM)
      setTouched({})
      setErrors({})
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputClass = (name) =>
    `input transition-all duration-200 ${
      touched[name] && errors[name]
        ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
        : touched[name] && !errors[name]
        ? 'border-green focus:border-green focus:ring-green/20'
        : ''
    }`

  return (
    <section id="contact" className="section">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 32 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="section-heading">Contact</h2>
        <div className="section-divider" />

        <div className="grid md:grid-cols-2 gap-12">

          {/* ── Left panel ── */}
          <div className="flex flex-col gap-6">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-ink2 text-base leading-relaxed"
            >
              Whether you're hiring, have a role in mind, or just want to connect —
              I'm actively looking for QA or Data Engineering opportunities and
              would love to hear from you.
            </motion.p>

            <div className="flex flex-col gap-4">
              <InfoRow icon={FiMail}  label="Email" value={PERSONAL.email} href={`mailto:${PERSONAL.email}`} delay={0.2} />
              <InfoRow icon={FiPhone} label="Phone" value={PERSONAL.phone ?? '+91 9360898954 '} href={`tel:${(PERSONAL.phone ?? '+919876543210').replace(/\s/g, '')}`} delay={0.3} />
              <InfoRow icon={FiClock} label="Available to connect" value="Mon – Fri, 9:00 AM – 6:00 PM IST" delay={0.4} />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-off2 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
              </span>
              <span className="text-xs font-medium text-ink2">Open to full-time & contract roles</span>
            </motion.div>
          </div>

          {/* ── Form ── */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="from_name" className="block text-xs text-ink3 mb-1.5">Name</label>
                <input id="from_name" name="from_name" type="text" placeholder="Your name"
                  value={form.from_name} onChange={handleChange} onBlur={handleBlur}
                  className={inputClass('from_name')} />
                <FieldError message={touched.from_name ? errors.from_name : ''} />
              </div>
              <div>
                <label htmlFor="from_email" className="block text-xs text-ink3 mb-1.5">Email</label>
                <input id="from_email" name="from_email" type="email" placeholder="you@email.com"
                  value={form.from_email} onChange={handleChange} onBlur={handleBlur}
                  className={inputClass('from_email')} />
                <FieldError message={touched.from_email ? errors.from_email : ''} />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xs text-ink3 mb-1.5">
                Phone <span className="text-ink3/50">(optional)</span>
              </label>
              <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210"
                value={form.phone} onChange={handleChange} onBlur={handleBlur}
                className={inputClass('phone')} />
              <FieldError message={touched.phone ? errors.phone : ''} />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs text-ink3 mb-1.5">Subject</label>
              <div className="relative">
                <select id="subject" name="subject"
                  value={form.subject} onChange={handleChange} onBlur={handleBlur}
                  className={`input appearance-none cursor-pointer pr-9 transition-all duration-200 ${
                    touched.subject && errors.subject
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                      : touched.subject && !errors.subject
                      ? 'border-green focus:border-green focus:ring-green/20'
                      : ''
                  }`}
                >
                  <option value="" disabled>Select a reason…</option>
                  <option value="Interested in Your Profile">🙋 Interested in Your Profile</option>
                  <option value="Just Connect">👋 Just Connect</option>
                  <option value="Business Inquiry">💼 Business Inquiry</option>
                </select>
                <FiChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink3 pointer-events-none" />
              </div>
              <FieldError message={touched.subject ? errors.subject : ''} />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="message" className="text-xs text-ink3">Message</label>
                <motion.span
                  animate={{ color: msgLen >= MESSAGE_LIMIT ? '#ef4444' : msgLen > MESSAGE_LIMIT * 0.8 ? '#f97316' : '#6b9e80' }}
                  transition={{ duration: 0.3 }}
                  className="text-xs tabular-nums"
                >
                  {msgLen} / {MESSAGE_LIMIT}
                </motion.span>
              </div>
              <textarea id="message" name="message" rows={5} placeholder="Your message…"
                value={form.message} onChange={handleChange} onBlur={handleBlur}
                className={inputClass('message')} />
              <FieldError message={touched.message ? errors.message : ''} />
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.p key="error"
                  initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-red-500 text-sm"
                >
                  <FiAlertCircle size={16} /> Something went wrong. Please try again.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <motion.span
                animate={status === 'sending' ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: status === 'sending' ? Infinity : 0, ease: 'linear' }}
              >
                <FiSend size={15} />
              </motion.span>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </motion.button>
          </form>
        </div>
      </motion.div>

      <AnimatePresence>
        {status === 'success' && (
          <SuccessPopup onDone={() => setStatus('idle')} />
        )}
      </AnimatePresence>
    </section>
  )
}