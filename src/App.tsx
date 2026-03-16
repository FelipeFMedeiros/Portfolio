import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Education from '@/components/sections/Education';
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
                <section id="experiencia" className="min-h-32" />
                <section id="habilidades" className="min-h-32" />
                <section id="projetos" className="min-h-32" />
                <section id="contato" className="min-h-32" />
            </main>
        </div>
    );
}

export default App;
