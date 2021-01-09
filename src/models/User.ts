import MySQL from "../db/MySQL";
import EmailException from "../exception/EmailException";
import PasswordException from "../exception/PasswordException";
import { UserInterface } from '../interfaces/User';
import { createConnection, Connection } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';
 
export default class User {

    public id?: number | null;
    public firstname: string;
    public lastname: string;
    public email: string;
    public user_password: string;
    public date_naissance: string;
    public sexe: string;
    public subscription: boolean;
    public createdat: any;
    public updateat: string;
    public roles: string;

    protected table: string = 'user';



    constructor(id: number | null, firstname: string = '', lastname: string = '', email: string = '', user_password : string, date_naissance : string = '', sexe: string ='', 
    subscription: boolean, createdat: string = '', updateat: string = '', roles: string = '') {

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

         if (EmailException.checkEmail(email))
             throw new EmailException;

        if (!PasswordException.isValidPassword(user_password))
            throw new PasswordException();

         
                this.firstname = firstname;
                this.lastname = lastname;
                this.email = email;
                this.user_password = user_password;
                this.date_naissance = date_naissance;
                this.sexe = sexe;
                this.subscription = subscription;
                this.createdat = dateFormat (new Date (), "%Y-%m-%d %H:%M:%S", true);
                this.updateat = dateFormat (new Date (), "%Y-%m-%d %H:%M:%S", true);
                this.roles = roles;
            

               
            
    }

    /************************* GETTER *************************/

    

    get attributInsert(): Array < string > {
        return ['id', 'firstname', 'lastname', 'email', 'user_password', 'date_naissance', 'sexe', 'subscription', 'createdat', 'updateat', 'roles']
    };

    get fullname(): string {
        return this.firstname + ' ' + this.lastname;
    }
    
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
    /**
     *
     * Save to the property in database
     * @returns {Promise < number >}
     * @memberof Personne
     */
    update(): Promise <number> {
        return new Promise((resolve, reject) => {
            MySQL.update(this.table, this).then((id: number) => {
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

    static isExiste(email: string) {
        return new Promise((resolve, reject) => {
            MySQL.select(email).then((arrayClient: Array <any> ) => {
                resolve((arrayClient.length > 0));
                
            })
            .catch((err: any) => {
                console.log(err);
                
                reject(false);
            });
        })
    }
}

