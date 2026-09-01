import { SimpleDate } from "../lib/SimpleDate";

export interface Event {
    id: string;
    title: string;
    description: string;
    image: string;
    color: string;
    date: SimpleDate;
}