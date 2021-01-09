import { UserInterface } from './User';


export interface FactureInterface extends UserInterface{
    id?: number | null | undefined;
    date_payment: string;
    montant_ht: string;
    montant_ttc: string;
    source: string;
    created_at: any;
    update_at: string;
    user_id: number;
}