import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import MouseGlow from '@/components/ui/MouseGlow';

export default function Portfolio() {
    return (
        <div className="portfolio-page min-h-screen bg-background text-foreground">
            <a className="skip-link" href="#main-content">Pular para o conteúdo</a>
            <MouseGlow />
            <Header />
            <main id="main-content" tabIndex={-1}>
                <Hero />
                <Projects />
                <Experience />
                <About />
                <Skills />
                <Education />
                <Contact />
            </main>
        </div>
    );
}
