import MySQL, { jointureInterface } from "../db/MySQL";
import EmailException from "../exception/EmailException";
import PasswordException from "../exception/PasswordException";
import { UserInterface } from '../interfaces/User';
import { createConnection, Connection } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';
 
export default class User {

    public id: number | null | undefined;
    public firstname: string;
    public lastname: string;
    public email: string;
    public user_password: string;
    public date_naissance: string;
    public sexe: string;
    public subscription: boolean;
    public createdat: string;
    public updateat: string;
    public roles: string;

    protected table: string = 'user';

    constructor(id: number, firstname: string = '', lastname: string = '', email: string = '', user_password : string, date_naissance : string = '', sexe: string ='', 
    subscription: boolean, createdat: string = '', updateat: string = '', roles: string = '') {

    

         if (EmailException.checkEmail(email))
             throw new EmailException;

        if (!PasswordException.isValidPassword(user_password))
            throw new PasswordException();
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.user_password = user_password;
        this.date_naissance = date_naissance;
        this.sexe = sexe;
        this.subscription = subscription;
        this.createdat = createdat;
        this.updateat = updateat;
        this.roles = roles;
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['id', 'firstname', 'lastname', 'email', 'user_password', 'date_naissance', 'sexe', 'subscription', 'createdat', 'updateat', 'roles']
    };

    get fullname(): string {
        return this.firstname + ' ' + this.lastname;
    }
    /************************* STATIC METHOD *************************/

    /**
     * 
     * Select of any defined entity
     * @static
     * @param {string} table 
     * @param {(User)} insert
     * @returns {any}
     * @memberof MySQL
     */
    static select(where ?: any): any {
        return new Promise((resolve, reject) => {

            const bdd: Connection = createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL)
            })

            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            })

            let data = [];
            let columns = "";
            let conditionWhere = "";

            // const key = listAttributSelect[table].attribut; // select is the method from the Class Personne or Client => Array<string>

            // for (const champs of key) {
            //     columns += "`" + champs + "`,";
            // }

            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key])
            }
            //console.log(where)
            conditionWhere = conditionWhere.slice(0, -5);
            columns = columns.slice(0, -1);
            
            bdd.query(`SELECT * FROM user WHERE email='${where}';`, [data], (error, results, fields) => {
                if (error){
                    reject(error);
                    
                }
                else{
                    resolve(results);
                    
                } 
                bdd.end();
            });
        })
    }

    //         // MySQL.selectJoin('user', join, where).then((arrayClient: Array <any>) => {
    //         //    // let newPersonne: Personne;
    //         //    // let data: Array <Personne> = [];

    //         //     for (const personne of arrayClient) {
    //         //         personne.dateNaiss = new String(personne.dateNaiss)
    //         //         personne.id = personne.idpersonne;
    //         //         //newPersonne = new Personne(personne);
    //         //         //data.push(new User(newPersonne, personne.email, personne.user_password));
    //         //     }
                
    //         //     console.log(data);
    //         //     resolve(data);
    //         // })
    //         // .catch((err: any) => {
    //         //     console.log(err);
    //         //     reject(false)
    //         // });
    //     })
    // }

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

    // static isExiste(email: string) {
    //     return new Promise((resolve, reject) => {
    //         MySQL.select('user', {email: email}).then((arrayClient: Array <any> ) => {
    //             resolve((arrayClient.length > 0));
    //         })
    //         .catch((err: any) => {
    //             console.log(err);
    //             reject(false);
    //         });
    //     })
    // }
}

