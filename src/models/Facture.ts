import MySQL from "../db/MySQL";
import EmailException from "../exception/EmailException";
import PasswordException from "../exception/PasswordException";
import { FactureInterface } from '../interfaces/Facture';
import { createConnection, Connection } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';

 
export default class Facture{

    public id: number | null | undefined;
    public date_payment: string;
    public montant_ttc: string;
    public source: string;
    public created_at: any;
    public update_at: string;
    public user_id: number;

    protected table: string = 'facture';

    constructor(id: number, date_payment: string = '', montant_ttc: string = '', source: string = '', created_at : string = '', update_at: string ='', user_id : number) {

       
        function dateFormat (date: any, fstr: any, utc: any) {
            utc = utc ? 'getUTC' : 'get';
            return fstr.replace (/%[YmdHMS]/g, function (m: any) {
              switch (m) {
              case '%Y': return date[utc + 'FullYear'] (); // no leading zeros required
              case '%m': m = 1 + date[utc + 'Month'] (); break;
              case '%d': m = date[utc + 'Date'] (); break;
              case '%H': m = date[utc + 'Hours'] (); break;
              case '%M': m = date[utc + 'Minutes'] (); break;
              case '%S': m = date[utc + 'Seconds'] (); break;
              default: return m.slice (1); // unknown code, remove %
              }
              // add leading zero if required
              return ('0' + m).slice (-2);
            });
          }


          

        //this.id = id;
        this.date_payment = date_payment;
        this.montant_ttc = montant_ttc;
        this.source = source;
        this.created_at = dateFormat (new Date (), "%Y-%m-%d %H:%M:%S", true);
        this.update_at = dateFormat (new Date (), "%Y-%m-%d %H:%M:%S", true);
        this.user_id = user_id;
    
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['id', 'date_payment', 'montant_ttc', 'source', 'created_at', 'update_at', 'user_id']
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

