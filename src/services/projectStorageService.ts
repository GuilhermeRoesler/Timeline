import demoProject from '../data/demoProject.json';
import type { Project, ProjectData, ProjectSummary } from '../types/project';
import type { Settings } from '../types/settings';
import type { ApiEvent, ApiPeriod } from '../types/userData';
import type { Period } from '../types/period';
import type { Event } from '../types/event';

const STORAGE_KEY = 'timeline_projects';
export const DEMO_PROJECT_ID = 'demo-project';

let activeProjectId: string | null = null;

const defaultSettings: Settings = {
    year_spacing: 100,
    base_year: 2010,
    period_height: 80,
    level_spacing: 30,
    event_radius: 10,
    colorize_on_create: false,
    theme_index: 0,
    negative_level: true,
};

const emptyProjectData = (): ProjectData => ({
    periods: [],
    events: [],
    settings: { ...defaultSettings },
});

const loadProjects = (): Project[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as Project[];
    } catch {
        return [];
    }
};

const saveProjects = (projects: Project[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

const createDemoProject = (): Project => {
    const now = new Date().toISOString();
    return {
        id: DEMO_PROJECT_ID,
        name: demoProject.name,
        description: demoProject.description,
        createdAt: now,
        updatedAt: now,
        isDemo: true,
        data: demoProject.data,
    };
};

export const initializeStorage = (): void => {
    const projects = loadProjects();
    if (projects.length === 0) {
        saveProjects([createDemoProject()]);
    } else if (!projects.some((p) => p.id === DEMO_PROJECT_ID)) {
        saveProjects([createDemoProject(), ...projects]);
    }
};

export const setActiveProjectId = (id: string | null): void => {
    activeProjectId = id;
};

export const getActiveProjectId = (): string | null => activeProjectId;

const getActiveProject = (): Project => {
    if (!activeProjectId) {
        throw new Error('Nenhum projeto ativo selecionado.');
    }
    const project = loadProjects().find((p) => p.id === activeProjectId);
    if (!project) {
        throw new Error('Projeto ativo não encontrado.');
    }
    return project;
};

const updateActiveProjectData = (data: ProjectData): void => {
    const projects = loadProjects();
    const index = projects.findIndex((p) => p.id === activeProjectId);
    if (index === -1) return;

    projects[index] = {
        ...projects[index],
        data,
        updatedAt: new Date().toISOString(),
    };
    saveProjects(projects);
};

export const getAllProjectSummaries = (): ProjectSummary[] => {
    return loadProjects().map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        isDemo: project.isDemo,
        periodCount: project.data.periods.length,
        eventCount: project.data.events.length,
        previewPeriods: project.data.periods.slice(0, 8).map((period) => ({
            color: period.color,
            startYear: Number(period.start_date.slice(0, 4)),
            endYear: Number(period.end_date.slice(0, 4)),
            level: period.level,
        })),
        previewEvents: project.data.events.slice(0, 12).map((event) => ({
            color: event.color,
            year: Number(event.event_date.slice(0, 4)),
        })),
    }));
};

export const getProject = (id: string): Project | null => {
    return loadProjects().find((p) => p.id === id) ?? null;
};

export const createProject = (name: string, description: string): Project => {
    const now = new Date().toISOString();
    const project: Project = {
        id: crypto.randomUUID(),
        name: name.trim(),
        description: description.trim(),
        createdAt: now,
        updatedAt: now,
        isDemo: false,
        data: emptyProjectData(),
    };

    const projects = loadProjects();
    projects.push(project);
    saveProjects(projects);
    return project;
};

export const updateProjectMeta = (
    id: string,
    updates: { name?: string; description?: string },
): Project | null => {
    const projects = loadProjects();
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated: Project = {
        ...projects[index],
        name: updates.name?.trim() ?? projects[index].name,
        description: updates.description?.trim() ?? projects[index].description,
        updatedAt: new Date().toISOString(),
    };
    projects[index] = updated;
    saveProjects(projects);
    return updated;
};

export const deleteProject = (id: string): boolean => {
    const projects = loadProjects();
    const project = projects.find((p) => p.id === id);
    if (!project || project.isDemo) return false;

    saveProjects(projects.filter((p) => p.id !== id));
    return true;
};

export const getAllPeriods = (): ApiPeriod[] => getActiveProject().data.periods;

export const createPeriod = (
    periodData: Omit<ApiPeriod, 'id'> & { id: string | null },
): ApiPeriod => {
    const project = getActiveProject();
    const newPeriod: ApiPeriod = {
        ...periodData,
        id: periodData.id ?? crypto.randomUUID(),
    };
    project.data.periods.push(newPeriod);
    updateActiveProjectData(project.data);
    return newPeriod;
};

export const updatePeriod = (periodData: ApiPeriod & { id: string }): ApiPeriod => {
    const project = getActiveProject();
    project.data.periods = project.data.periods.map((p) =>
        p.id === periodData.id ? periodData : p,
    );
    updateActiveProjectData(project.data);
    return periodData;
};

export const deletePeriod = (periodId: string): void => {
    const project = getActiveProject();
    project.data.periods = project.data.periods.filter((p) => p.id !== periodId);
    updateActiveProjectData(project.data);
};

export const getAllEvents = (): ApiEvent[] => getActiveProject().data.events;

export const createEvent = (eventData: Omit<ApiEvent, 'id'> & { id: string | null }): ApiEvent => {
    const project = getActiveProject();
    const newEvent: ApiEvent = {
        ...eventData,
        id: eventData.id ?? crypto.randomUUID(),
    };
    project.data.events.push(newEvent);
    updateActiveProjectData(project.data);
    return newEvent;
};

export const updateEvent = (eventData: ApiEvent & { id: string }): ApiEvent => {
    const project = getActiveProject();
    project.data.events = project.data.events.map((e) => (e.id === eventData.id ? eventData : e));
    updateActiveProjectData(project.data);
    return eventData;
};

export const deleteEvent = (eventId: string): void => {
    const project = getActiveProject();
    project.data.events = project.data.events.filter((e) => e.id !== eventId);
    updateActiveProjectData(project.data);
};

export const getSettings = (): Settings => getActiveProject().data.settings;

export const updateSettings = (settingsData: Settings): void => {
    const project = getActiveProject();
    project.data.settings = settingsData;
    updateActiveProjectData(project.data);
};

export const resetSettings = (settingsData: Settings): void => {
    updateSettings(settingsData);
};

export const colorizeTimeline = (periods: ApiPeriod[], events: ApiEvent[]): void => {
    const project = getActiveProject();
    project.data.periods = periods;
    project.data.events = events;
    updateActiveProjectData(project.data);
};

const periodToApi = (period: Period): ApiPeriod => ({
    id: period.id,
    title: period.title,
    description: period.description,
    image: period.image,
    color: period.color,
    start_date: period.start.toString(),
    end_date: period.end.toString(),
    level: period.level,
});

export const syncPeriods = (periods: Period[]): void => {
    const project = getActiveProject();
    project.data.periods = periods.map(periodToApi);
    updateActiveProjectData(project.data);
};

export const syncEvents = (events: Event[]): void => {
    const project = getActiveProject();
    project.data.events = events.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        image: e.image,
        color: e.color,
        event_date: e.date.toString(),
    }));
    updateActiveProjectData(project.data);
};

const isValidProjectData = (data: unknown): data is ProjectData => {
    if (!data || typeof data !== 'object') return false;
    const candidate = data as ProjectData;
    return (
        Array.isArray(candidate.periods) &&
        Array.isArray(candidate.events) &&
        typeof candidate.settings === 'object' &&
        candidate.settings !== null
    );
};

const isValidProject = (value: unknown): value is Project => {
    if (!value || typeof value !== 'object') return false;
    const candidate = value as Project;
    return (
        typeof candidate.id === 'string' &&
        typeof candidate.name === 'string' &&
        typeof candidate.description === 'string' &&
        isValidProjectData(candidate.data)
    );
};

export const exportProjectById = (id: string): string | null => {
    const project = getProject(id);
    if (!project) return null;
    return JSON.stringify(project, null, 2);
};

export const exportAllProjects = (): string => {
    return JSON.stringify(loadProjects(), null, 2);
};

export const importProjectFromJson = (json: string): Project => {
    const parsed: unknown = JSON.parse(json);

    if (Array.isArray(parsed)) {
        throw new Error('Use a importação de um único projeto por vez.');
    }

    if (!isValidProject(parsed)) {
        throw new Error('Arquivo JSON inválido para importação de projeto.');
    }

    const now = new Date().toISOString();
    const project: Project = {
        ...parsed,
        id: parsed.isDemo ? DEMO_PROJECT_ID : crypto.randomUUID(),
        isDemo: false,
        name: parsed.name.trim() || 'Projeto importado',
        description: parsed.description.trim(),
        createdAt: parsed.createdAt ?? now,
        updatedAt: now,
    };

    const projects = loadProjects().filter((p) => p.id !== project.id);
    projects.push(project);
    saveProjects(projects);
    return project;
};
