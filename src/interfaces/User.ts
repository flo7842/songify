export interface UserInterface{
    id?: number | null | undefined;
    firstname: string;
    lastname: string;
    email: string;
    user_password: string;
    date_naissance: any;
    sexe: string;
    subscription: boolean;
    createdat: any;
    updateat: any;
    roles: string;
    //save(): Promise <number>
}