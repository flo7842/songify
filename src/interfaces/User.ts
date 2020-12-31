import { PersonneInterfaces } from "./Personne";

export interface User extends PersonneInterfaces {
    personne_id: number | null | undefined;
    email: string;
    password: string;

    save(): Promise <number>
}