
import { UserInterface } from './User';
export interface CreditCardInterface extends UserInterface{
    id?: number | null | undefined;
    card_number: any;
    month: string;
    year: string;
    default_card: string;
    user_id: any;
}