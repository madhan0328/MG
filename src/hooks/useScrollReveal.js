import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Returns a ref and a boolean `isVisible`.
 * Attach `ref` to any element; `isVisible` becomes true once it
 * enters the viewport and stays true (no re-hiding).
 *
 * @param {number} threshold  – 0–1, how much of the element must be visible
 * @param {string} rootMargin – CSS margin, e.g. '0px 0px -80px 0px'
 */
export default function useScrollReveal(threshold = 0.15, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el) // trigger once only
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, isVisible }
}
