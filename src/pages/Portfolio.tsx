import { useEffect } from 'react';
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
    // Scroll to hash section when entering via a URL like /#sobre
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;
        const id = hash.slice(1);
        const timer = setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <MouseGlow />
            <Header />
            <main>
                <Hero />
                <About />
                <Education />
                <Experience />
                <Skills />
                <Projects />
                <Contact />
            </main>
        </div>
    );
}
