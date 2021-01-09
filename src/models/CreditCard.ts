import MySQL from "../db/MySQL";

 
export default class CreditCard{

    public id: number | null | undefined;
    public card_number: string;
    public month: string;
    public year: string;
    public default_card: any;
    public user_id: number;

    protected table: string = 'creditcard';

    constructor(id: number, card_number: string = '', month: string = '', year: string = '', default_card : string = '', user_id: number) {

        this.id = id;
        this.card_number = card_number;
        this.month = month;
        this.year = year;
        this.default_card = default_card;
        this.user_id = user_id;
    
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['id', 'card_number', 'month', 'year', 'default_card', 'user_id']
    };

   
    /**
     *
     * Save to the property in database
     * @returns {Promise < number >}
     * @memberof Personne
     */
    save(): Promise <number> {
        return new Promise((resolve, reject) => {
            MySQL.insert(this.table, this).then((id: number) => {
                this.id = id;
                console.log(`Save ${this.table}`);
                resolve(id);
            })
            .catch((err: any) => {
                console.log(err);
                reject(false);
            });
        })
    };
    
}

