import { useState } from 'react';
import Timeline from './pages/Timeline';
import DashboardPage from './pages/DashboardPage';
import { useProjectsStore } from './store/projectsStore';
import type { ApiUserData } from './types/userData';

type Page = 'dashboard' | 'timeline';

const App = () => {
    const [page, setPage] = useState<Page>('dashboard');
    const [timelineData, setTimelineData] = useState<ApiUserData | null>(null);
    const { selectProject, clearActiveProject } = useProjectsStore();

    const handleOpenProject = (id: string) => {
        const project = selectProject(id);
        if (!project) return;

        setTimelineData({
            periods: project.data.periods,
            events: project.data.events,
            settings: project.data.settings,
        });
        setPage('timeline');
    };

    const handleBackToDashboard = () => {
        clearActiveProject();
        setTimelineData(null);
        setPage('dashboard');
    };

    if (page === 'timeline' && timelineData) {
        return <Timeline data={timelineData} onBack={handleBackToDashboard} />;
    }

    return <DashboardPage onOpenProject={handleOpenProject} />;
};

export default App;
