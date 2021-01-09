import { createConnection, Connection } from 'mysql';
import listAttributSelect, { listeTables } from '../utils/listAttributSelect';
import User from '../models/User';
import Song from '../models/Song';
import Facture from '../models/Facture';
import CreditCard from '../models/CreditCard';


export interface jointureInterface{
    type: 'LEFT'|'RIGHT'|'FULL'|'INNER';
    where: {
        table: listeTables;
        foreignKey: string;
    };
    table: listeTables;
}

/**
 * 
 * Class CRUD to database MySQL/MariaDB
 * @export
 * @class MySQL
 */
export default class MySQL {

    /**
     * 
     * Insertion of any defined entity
     * @static
     * @param {string} table 
     * @param {(User | Facture | CreditCard | Song)} insert
     * @returns {Promise <number>}
     * @memberof MySQL
     */
    static insert(table: string, instance: User | CreditCard | Facture | Song): Promise<number> {
        return new Promise((resolve, reject) => {
        

            // Initialize params of database
            const bdd: Connection = createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
                
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) 
            })

            // Open database connection
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            })
            
            let data = []; // Stores values
            let columns = ""; // Column names equals to attributes
            let parameters = ""; // Amount of parameters for the insert query
    
            for (const [key, value] of Object.entries(instance)) { // Convert the properties of our objects to an array
                if (instance.attributInsert.indexOf(key) !== -1) { // Check to property to the key array because the children Object will access property parent
                    columns += "`" + key + "`,";
                    parameters += "?,";
                    data.push(value);
                }
            }
    
            // Delete the last char (here, deletes the last coma ',')
            columns = columns.slice(0, -1);
            parameters = parameters.slice(0, -1);
    
            // Run SQL Query
            bdd.query(`INSERT INTO ${table} (${columns}) VALUES (${parameters})`, data, (error, results, fields) => {
                if (error){
                    console.log(error);
                    reject(error); // Catch error => Response promise false
                }                 
                else
                    resolve(results.insertId); // Then or await => Response promise true

                bdd.end(); // Close connection
            });
        })     
    }


    /**
     * 
     * Insertion of any defined entity
     * @static
     * @param {string} table 
     * @param {(User | Facture | CreditCard | Song)} update
     * @returns {Promise <number>}
     * @memberof MySQL
     */
    static update(table: string, instance: User): Promise<number> {
        return new Promise((resolve, reject) => {
    

            // Initialize params of database
            const bdd: Connection = createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_DATABASE,
             
                port: parseInt((process.env.PORTMYSQL === undefined) ? '3306' : process.env.PORTMYSQL) 
            })

            // Open database connection
            bdd.connect(err => {
                if (err)
                    console.log('Connection database error');
            })
            
            let data = []; // Stores values
            let columns = ""; // Column names equals to attributes
            let parameters = ""; // Amount of parameters for the insert query
    
            for (const [key, value] of Object.entries(instance)) { // Convert the properties of our objects to an array
                if (instance.attributInsert.indexOf(key) !== -1) { // Check to property to the key array because the children Object will access property parent
                    columns += key + " = " + `'${value}'` + ",";
                    parameters += "?,";
                    
                    data.push(value);
                }
            }
            
    
            // Delete the last char (here, deletes the last coma ',')
            columns = columns.slice(0, -1);
            parameters = parameters.slice(0, -1);
            console.log("Les data " + data)
            let dataInsert = `${columns} = ${parameters}`
            // Run SQL Query
            bdd.query(`UPDATE ${table} SET ${columns} WHERE id = ${instance.id}`, data, (error, results, fields) => {
                if (error){
                    console.log(error);
                    reject(error); // Catch error => Response promise false
                }                 
                else
                    resolve(results.insertId); // Then or await => Response promise true

                bdd.end(); // Close connection
            });
        })     
    }

    /************************* STATIC METHOD *************************/

    /**
     * 
     * Select of any defined entity
     * @static
     * @param {string} table 
     * @param {(User | Facture | CreditCard | Song)} insert
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

            for (const key in where) {
                conditionWhere += "`" + key + "` LIKE ? and ";
                data.push(where[key])
            }
            
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
}