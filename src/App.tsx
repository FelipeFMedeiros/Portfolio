import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import type { ComponentType } from 'react';
import ScrollToTop from '@/components/ScrollToTop';
import Portfolio from '@/pages/Portfolio';
import NotFound from '@/pages/NotFound';
import SeoManager from '@/components/SeoManager';
import { MotionConfig } from 'motion/react';

const LazyProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const LazyPaymentConfirmation = lazy(() => import('@/pages/PaymentConfirmation'));

export default function App({ ProjectPage = LazyProjectDetail, PaymentPage = LazyPaymentConfirmation }: {
    ProjectPage?: ComponentType; PaymentPage?: ComponentType;
}) {
    return (
        <MotionConfig reducedMotion="user">
            <ScrollToTop />
            <SeoManager />
            <Suspense fallback={<div className="min-h-screen bg-background" aria-label="Carregando página" role="status" />}>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/projects/:slug" element={<ProjectPage />} />
                <Route path="/success" element={<PaymentPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
        </MotionConfig>
    );
}
