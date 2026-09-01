import { SimpleDate } from "../lib/SimpleDate";

export type DateString = `${number}-${number}-${number}`;

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