export interface UserInterface{
    id?: number | null | undefined;
    firstname: string;
    lastname: string;
    email: string;
    user_password: string;
    date_naissance: string;
    sexe: string;
    subscription: boolean;
    createdat: string;
    updateat: string;
    roles: string;
    //save(): Promise <number>
}