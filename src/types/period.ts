import { SimpleDate } from '../lib/SimpleDate';

export interface Period {
    id: string;
    title: string;
    description: string;
    image: string;
    color: string;
    start: SimpleDate;
    end: SimpleDate;
    level: number;
}
