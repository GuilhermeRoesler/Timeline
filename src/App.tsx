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
  const { api, setAuthToken } = useGlobalConfigStore(state => ({
    api: state.api,
    setAuthToken: state.setAuthToken
  }));

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setAuthToken(token);
    }
    fetchUserData(); // This now also acts as our session check
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const [periodsRes, eventsRes, settingsRes] = await Promise.all([
        api.get('/periods'),
        api.get('/events'),
        api.get('/settings')
      ]);

      const periods = periodsRes.data;
      const events = eventsRes.data;
      const settings = settingsRes.data;

      if (settings === null && periods.length === 0 && events.length === 0) {
        setUserData(initialData as UserData);
        await api.post('/settings', initialData.settings);
      } else {
        setUserData({ periods, events, settings });
      }

      setPage('timeline');
    } catch (error) {
      console.error("Failed to fetch user data (likely not logged in):", error);
      setPage('login');
      setAuthToken(null); // Clear any invalid token
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
      setAuthToken(null);
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