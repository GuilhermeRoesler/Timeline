import { useState, useEffect, useCallback } from 'react';
import Timeline from './pages/Timeline';
import LoginPage from './pages/LoginPage';
import LoadingSpinner from './icons/LoadingSpinner';
import type { ApiUserData } from './types/userData';
import RegisterPage from './pages/RegisterPage';
import { useGlobalConfigStore } from './store/globalConfigStore';
import initialData from './data/initialData.json';
import { getAllPeriods } from './services/periodService';
import { getAllEvents } from './services/eventService';
import { getSettings, updateSettings } from './services/settingsService';
import { logout } from './services/authService';

const App = () => {
    const [page, setPage] = useState('login'); // 'login', 'register', 'timeline'
    const [userData, setUserData] = useState<ApiUserData | null>(null);
    const [loading, setLoading] = useState(() => !!localStorage.getItem('authToken'));
    const setAuthToken = useGlobalConfigStore((state) => state.setAuthToken);

    const fetchUserData = useCallback(async () => {
        setLoading(true);
        try {
            const [periods, events, settings] = await Promise.all([
                getAllPeriods(),
                getAllEvents(),
                getSettings(),
            ]);

            if (settings === null && periods.length === 0 && events.length === 0) {
                setUserData({
                    periods: initialData.periods,
                    events: initialData.events,
                    settings: initialData.settings,
                });
                await updateSettings(initialData.settings);
            } else {
                setUserData({ periods, events, settings });
            }

            setPage('timeline');
        } catch (error) {
            console.error('Failed to fetch user data (likely not logged in):', error);
            setPage('login');
            setAuthToken(null); // Clear any invalid token
        } finally {
            setLoading(false);
        }
    }, [setAuthToken]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        setAuthToken(token);
        const timeoutId = window.setTimeout(() => {
            void fetchUserData();
        }, 0);
        return () => window.clearTimeout(timeoutId);
    }, [fetchUserData, setAuthToken]);

    const handleLoginSuccess = () => {
        fetchUserData();
    };

    const handleRegisterSuccess = () => {
        setPage('login');
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            setAuthToken(null);
            setUserData(null);
            setPage('login');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <LoadingSpinner size="h-16 w-16" />
            </div>
        );
    }

    switch (page) {
        case 'register':
            return (
                <RegisterPage
                    onRegisterSuccess={handleRegisterSuccess}
                    onNavigateToLogin={() => setPage('login')}
                />
            );
        case 'timeline':
            if (!userData)
                return (
                    <LoginPage
                        onLoginSuccess={handleLoginSuccess}
                        onNavigateToRegister={() => setPage('register')}
                    />
                );
            return <Timeline data={userData} onLogout={handleLogout} />;
        case 'login':
        default:
            return (
                <LoginPage
                    onLoginSuccess={handleLoginSuccess}
                    onNavigateToRegister={() => setPage('register')}
                />
            );
    }
};

export default App;
