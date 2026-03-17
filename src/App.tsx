import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import MouseGlow from '@/components/ui/MouseGlow';

function App() {
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
                <section id="projetos" className="min-h-32" />
                <section id="contato" className="min-h-32" />
            </main>
        </div>
    );
}

export default App;
