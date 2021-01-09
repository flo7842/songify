export interface FactureInterface{
    id?: number | null | undefined;
    date_payment: string;
    montant_ht: string;
    montant_ttc: string;
    source: string;
    created_at: any;
    update_at: string;
    user_id: boolean;
}