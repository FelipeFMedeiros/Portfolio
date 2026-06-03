import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function PaymentConfirmation() {
    // Pegamos os parâmetros da URL, ex: /success?type=project ou /success?type=maintenance
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');

    // Podemos ter um fallback amigável se não vier parâmetro
    const isMaintenance = type === 'maintenance';
    const isProject = type === 'project';

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden p-4">
            {/* Efeitos de Fundo: Grid e Blur do Hero */}
            <div className="absolute inset-0 hero-dot-grid opacity-30"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/20 rounded-full blur-[120px]"></div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative z-10 flex flex-col items-center text-center max-w-2xl bg-card/40 backdrop-blur-xl p-10 md:p-14 border border-white/10 dark:border-white/5 rounded-4xl glow-cyan shadow-2xl"
            >
                {/* Ícone Animado Central */}
                <div className="relative mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
                        className="w-28 h-28 rounded-full bg-primary/10 flex items-center justify-center text-primary relative z-10"
                    >
                        {isMaintenance ? (
                            <ShieldCheck className="w-14 h-14" />
                        ) : isProject ? (
                            <Rocket className="w-14 h-14" />
                        ) : (
                            <CheckCircle2 className="w-14 h-14" />
                        )}
                    </motion.div>

                    {/* Círculo pulsante atrás do ícone */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                        className="absolute inset-0 rounded-full bg-primary/40 -z-10"
                    ></motion.div>
                </div>

                {/* Textos com revelação em cascata */}
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient-cyan"
                >
                    Pagamento Confirmado!
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-lg md:text-xl text-muted-foreground mb-10 space-y-2"
                >
                    {isMaintenance ? (
                        <>
                            <p>
                                Excelente escolha! Seu <strong>Plano de Manutenção</strong> está ativo e operante.
                            </p>
                            <p className="text-base text-muted-foreground/80">
                                Agora você tem tranquilidade e suporte técnico garantidos para focar em escalar o seu
                                negócio sem preocupações técnicas.
                            </p>
                        </>
                    ) : isProject ? (
                        <>
                            <p>
                                Tudo pronto! O pagamento do seu <strong>Projeto</strong> foi aprovado.
                            </p>
                            <p className="text-base text-muted-foreground/80">
                                Estou muito animado para começarmos a construir algo incrível e inovador juntos. Apertem
                                os cintos!
                            </p>
                        </>
                    ) : (
                        <p>
                            A transação foi um sucesso. Agradeço imensamente pela confiança depositada no meu trabalho!
                        </p>
                    )}
                </motion.div>

                {/* Botão de retorno */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar para a Página Inicial
                    </Link>
                </motion.div>
            </motion.div>

            {/* Partículas flutuantes (Efeito Wow/Confetes abstratos) */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-primary/40 pointer-events-none"
                    style={{
                        width: Math.random() * 10 + 4 + 'px',
                        height: Math.random() * 10 + 4 + 'px',
                    }}
                    initial={{
                        x: '50vw',
                        y: '50vh',
                        opacity: 0,
                    }}
                    animate={{
                        x: `${Math.random() * 100}vw`,
                        y: `${Math.random() * 100}vh`,
                        opacity: [0, 0.8, 0],
                        scale: [0, Math.random() * 2 + 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 4 + 3,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}
