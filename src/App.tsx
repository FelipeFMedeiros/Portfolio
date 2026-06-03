import { Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import Portfolio from '@/pages/Portfolio';
import ProjectDetail from '@/pages/ProjectDetail';
import PaymentConfirmation from '@/pages/PaymentConfirmation';

export default function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/success" element={<PaymentConfirmation />} />
            </Routes>
        </>
    );
}
