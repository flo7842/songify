export interface CreditCardInterface{
    id?: number | null | undefined;
    card_number: any;
    month: string;
    year: string;
    default_card: string;
    user_id: any;
    //save(): Promise <number>
}