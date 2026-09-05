import type { Settings } from './settings';
import type { ApiEvent, ApiPeriod } from './userData';

export interface ProjectData {
    periods: ApiPeriod[];
    events: ApiEvent[];
    settings: Settings;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isDemo: boolean;
    data: ProjectData;
}

export interface ProjectSummary {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    isDemo: boolean;
    periodCount: number;
    eventCount: number;
    previewPeriods: {
        color: string;
        startYear: number;
        endYear: number;
        level: number;
    }[];
    previewEvents: {
        color: string;
        year: number;
    }[];
}
