import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Experience from '@/components/sections/Experience'
import Interests from '@/components/sections/Interests'
import Awards from '@/components/sections/Awards'
import Work from '@/components/sections/Work'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Interests />
      <Awards />
      <Work />
      <Contact />
    </main>
  )
}
