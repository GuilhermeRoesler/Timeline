import type { Period } from "./period";
import type { Event } from "./event";
import type { Settings } from "./settings";

export interface UserData {
    periods: Period[];
    events: Event[];
    settings: Settings | null;
}