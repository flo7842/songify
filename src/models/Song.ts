import MySQL, { jointureInterface } from "../db/MySQL";
import EmailException from "../exception/EmailException";
import PasswordException from "../exception/PasswordException";
import { createConnection, Connection } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';
import { SongInterfaces } from './../interfaces/Song';
 
export default class Song {

    public id: number | null | undefined;
    public name: string;
    public url: string;
    public cover: string;
    public time: any;
    public created_at: any;
    public updated_at: any;
    public type: string;

    protected table: string = 'song';

    constructor(id: number | null, name: string = '', url: string = '', cover: string = '', created_at: any, updated_at: any, type: string = '') {

        this.id = id;
        this.name = name;
        this.url = url;
        this.cover = cover;
        this.created_at = new Date();
        this.updated_at = updated_at;
        this.type = type;
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['id', 'name', 'url', 'cover', 'created_at', 'updated_at', 'type']
    };
    

    /**
     *
     * Save to the property in database
     * @returns {Promise < number >}
     * @memberof Song
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

