import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import TimelineRoute, { DemoRedirect } from './pages/TimelineRoute';
import ToastContainer from './components/ui/ToastContainer';
import ConfirmDialog from './components/ui/ConfirmDialog';
import { hasVisitedBefore, markAsVisited } from './utils/visitTracking';
import { DEMO_PROJECT_ID } from './services/projectStorageService';

const FirstVisitRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!hasVisitedBefore()) {
            markAsVisited();
            navigate(`/project/${DEMO_PROJECT_ID}`, { replace: true });
        }
    }, [navigate]);

    if (!hasVisitedBefore()) return null;

    return <LandingPage />;
};

const App = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
            <ToastContainer />
            <ConfirmDialog />
            <Routes>
                <Route path="/" element={<FirstVisitRedirect />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/demo" element={<DemoRedirect />} />
                <Route path="/project/:projectId" element={<TimelineRoute />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
