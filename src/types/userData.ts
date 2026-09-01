import type { Period } from './period';
import type { Event } from './event';
import type { Settings } from './settings';

export interface UserData {
    periods: Period[];
    events: Event[];
    settings: Settings | null;
}

/** Dados recebidos da API antes da conversão para SimpleDate */
export interface ApiPeriod extends Omit<Period, 'start' | 'end'> {
    start_date: string;
    end_date: string;
}

export interface ApiEvent extends Omit<Event, 'date'> {
    event_date: string;
}

export interface ApiUserData {
    periods: ApiPeriod[];
    events: ApiEvent[];
    settings: Settings | null;
}
