import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return <main className="project-not-found"><span className="font-mono text-sm text-primary">404 /</span>
        <h1>Página não encontrada.</h1><Link to="/" className="action-secondary"><ArrowLeft size={16} />Voltar ao portfólio</Link></main>;
}
