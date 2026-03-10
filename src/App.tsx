import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';

function App() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
                <Hero />

                <section id="sobre" className="min-h-32" />
                <section id="educacao" className="min-h-32" />
                <section id="experiencia" className="min-h-32" />
                <section id="habilidades" className="min-h-32" />
                <section id="projetos" className="min-h-32" />
                <section id="contato" className="min-h-32" />
            </main>
        </div>
    );
}

export default App;
