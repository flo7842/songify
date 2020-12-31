import MySQL, { jointureInterface } from "../db/MySQL";
import Personne from "./Personne";
import EmailException from "../exception/EmailException";
import PasswordException from "../exception/PasswordException";

export default class User extends Personne {

    email: string;
    password: string = '';
    personne_idpersonne: number | null | undefined;

    protected table: string = 'user';

    constructor(id: Personne, email: string = '', password : string = '') {

        super(id); // super permet de lancer le constructeur du parent

        if (EmailException.checkEmail(email))
            throw new EmailException;

        if (!PasswordException.isValidPassword(password))
            throw new PasswordException();

        this.email = email;
        this.password = password;
        this.personne_idpersonne = this.id;
    }

    /************************* GETTER *************************/

    get attributInsert(): Array < string > {
        return ['personne_id', 'email', 'password']
    };

    /************************* STATIC METHOD *************************/

    static select(where: any) {
        return new Promise((resolve, reject) => {
            const join: Array <jointureInterface> = [{
                type: 'LEFT',
                table: 'personne',
                where: {
                    table: 'user',
                    foreignKey: 'personne_id'
                }
            }
            ]

            MySQL.selectJoin('user', join, where).then((arrayClient: Array <any>) => {
                let newPersonne: Personne;
                let data: Array <Personne> = [];

                for (const personne of arrayClient) {
                    personne.dateNaiss = new String(personne.dateNaiss)
                    personne.id = personne.idpersonne;
                    newPersonne = new Personne(personne);
                    data.push(new User(newPersonne, personne.email, personne.password));
                }
                
                console.log(data);
                resolve(data);
            })
            .catch((err: any) => {
                console.log(err);
                reject(false)
            });
        })
    }

    static isExiste(email: string) {
        return new Promise((resolve, reject) => {
            MySQL.select('user', {email: email}).then((arrayClient: Array <any> ) => {
                resolve((arrayClient.length > 0));
            })
            .catch((err: any) => {
                console.log(err);
                reject(false);
            });
        })
    }
}