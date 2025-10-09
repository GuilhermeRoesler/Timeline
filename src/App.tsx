import { useState, useEffect } from "react"
import Timeline from "./pages/Timeline";
import LoginPage from "./pages/LoginPage";
import LoadingSpinner from "./icons/LoadingSpinner";
import type { UserData } from "./types/userData";
import RegisterPage from "./pages/RegisterPage";
import { useGlobalConfigStore } from "./store/globalConfigStore";
import initialData from "./data/initialData.json";

const App = () => {
  const [page, setPage] = useState('login'); // 'login', 'register', 'timeline'
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const api = useGlobalConfigStore(state => state.api)

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/check');
      if (response.data.loggedIn) {
        fetchUserData();
      } else {
        setPage('login');
        setLoading(false);
      }
    } catch (error) {
      setPage('login');
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const [periodsRes, eventsRes, settingsRes] = await Promise.all([
        api.get('/periods'),
        api.get('/events'),
        api.get('/settings')
      ]);

      const periods = periodsRes.data;
      const events = eventsRes.data;
      const settings = settingsRes.data;

      // If settings are null and there are no periods/events, it's a new user.
      if (settings === null && periods.length === 0 && events.length === 0) {
        setUserData(initialData as UserData);
        // Save the initial settings to the backend for this new user
        await api.post('/settings', initialData.settings);
      } else {
        setUserData({ periods, events, settings });
      }

      setPage('timeline');
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setPage('login'); // Fallback to login on error
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    fetchUserData();
  };

  const handleRegisterSuccess = () => {
    setPage('login');
  }

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUserData(null);
      setPage('login');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    )
  }

  switch (page) {
    case 'register':
      return <RegisterPage onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => setPage('login')} api={api} />;
    case 'timeline':
      if (!userData) return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setPage('register')} api={api} />;
      return <Timeline data={userData} onLogout={handleLogout} />;
    case 'login':
    default:
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setPage('register')} api={api} />;
  }
};

export default App;