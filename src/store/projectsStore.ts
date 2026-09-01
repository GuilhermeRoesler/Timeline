import { create } from 'zustand';
import type { Project, ProjectSummary } from '../types/project';
import {
    createProject,
    deleteProject,
    getAllProjectSummaries,
    getProject,
    initializeStorage,
    setActiveProjectId,
    updateProjectMeta,
} from '../services/projectStorageService';

type ProjectsState = {
    projects: ProjectSummary[];
    activeProject: Project | null;
    loadProjects: () => void;
    selectProject: (id: string) => Project | null;
    clearActiveProject: () => void;
    addProject: (name: string, description: string) => Project;
    editProject: (id: string, name: string, description: string) => void;
    removeProject: (id: string) => boolean;
};

export const useProjectsStore = create<ProjectsState>((set) => ({
    projects: [],
    activeProject: null,

    loadProjects: () => {
        initializeStorage();
        set({ projects: getAllProjectSummaries() });
    },

    selectProject: (id: string) => {
        const project = getProject(id);
        if (!project) return null;
        setActiveProjectId(id);
        set({ activeProject: project });
        return project;
    },

    clearActiveProject: () => {
        setActiveProjectId(null);
        set({ activeProject: null });
    },

    addProject: (name: string, description: string) => {
        const project = createProject(name, description);
        set({ projects: getAllProjectSummaries() });
        return project;
    },

    editProject: (id: string, name: string, description: string) => {
        updateProjectMeta(id, { name, description });
        set({ projects: getAllProjectSummaries() });
    },

    removeProject: (id: string) => {
        const removed = deleteProject(id);
        if (removed) {
            set({ projects: getAllProjectSummaries() });
        }
        return removed;
    },
}));
