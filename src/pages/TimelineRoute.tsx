import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Timeline from './Timeline';
import { useProjectsStore } from '../store/projectsStore';
import { DEMO_PROJECT_ID, initializeStorage } from '../services/projectStorageService';
import { isOnboardingDismissed } from '../utils/visitTracking';

const TimelineRoute = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const { activeProject, selectProject, clearActiveProject, loadProjects } = useProjectsStore();
    const [onboardingVisible, setOnboardingVisible] = useState(() => !isOnboardingDismissed());

    const resolvedId = projectId ?? DEMO_PROJECT_ID;

    useEffect(() => {
        initializeStorage();
        loadProjects();
        const project = selectProject(resolvedId);
        if (!project) {
            navigate('/dashboard', { replace: true });
        }
    }, [resolvedId, loadProjects, navigate, selectProject]);

    if (!activeProject || activeProject.id !== resolvedId) {
        return null;
    }

    const isEmpty =
        activeProject.data.periods.length === 0 && activeProject.data.events.length === 0;
    const showOnboarding =
        onboardingVisible && (activeProject.isDemo || isEmpty) && !isOnboardingDismissed();

    const handleBack = () => {
        clearActiveProject();
        navigate('/dashboard');
    };

    return (
        <Timeline
            data={activeProject.data}
            projectName={activeProject.name}
            isDemo={activeProject.isDemo}
            showOnboarding={showOnboarding}
            onDismissOnboarding={() => setOnboardingVisible(false)}
            onBack={handleBack}
        />
    );
};

export const DemoRedirect = () => <Navigate to={`/project/${DEMO_PROJECT_ID}`} replace />;

export default TimelineRoute;
