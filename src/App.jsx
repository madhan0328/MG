import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import About        from './components/About'
import Experience   from './components/Experience'
import Skills       from './components/Skills'
import Certificates from './components/Certificates'
import Interests    from './components/Interests'
import Contact      from './components/Contact'
import Footer       from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certificates />
        <Interests />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
