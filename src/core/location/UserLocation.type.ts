import { type Location } from "./Location.type";

export interface UserLocation {
    userId: string,
    location: Location,
    timestamp: number
}
