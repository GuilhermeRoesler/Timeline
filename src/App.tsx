import { useState, useEffect } from "react"
import Timeline from "./pages/Timeline";
import LoginPage from "./pages/LoginPage";
import LoadingSpinner from "./icons/LoadingSpinner";
import type { UserData } from "./types/userData";
import RegisterPage from "./pages/RegisterPage";
import { useGlobalConfigStore } from "./store/globalConfigStore";

const App = () => {
  const [page, setPage] = useState('login'); // 'login', 'register', 'timeline'
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const api = useGlobalConfigStore(state => state.api)

  useEffect(() => {
    // Ao carregar a aplicação, tenta buscar os dados do usuário.
    // Se a sessão estiver ativa, o dashboard será exibido.
    // Caso contrário, o usuário será redirecionado para o login.
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/load_data.php');
      setUserData(response.data.data);
      setPage('timeline');
    } catch (error) {
      // Se a requisição falhar (ex: 401 Unauthorized), vai para a página de login
      setPage('login');
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
    // Opcional: Chamar um endpoint de logout se existir no backend.
    // await api.post('/logout.php'); 
    setUserData(null);
    setPage('login');
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
    case 'timeline': // Garante que userData não seja nulo ao renderizar Timeline
      if (!userData) return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setPage('register')} api={api} />;
      return <Timeline data={userData} onLogout={handleLogout} />;
    case 'login':
    default:
      return <LoginPage onLoginSuccess={handleLoginSuccess} onNavigateToRegister={() => setPage('register')} api={api} />;
  }
};

export default App;
