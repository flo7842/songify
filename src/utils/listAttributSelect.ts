export type listeTables = "user" | "song" | "facture";

interface attributSelectInterface {
    primaryKey: string;
    attribut: Array<string>;
}

/**
 *
 * List of the property retrieved for the Select method
 * @readonly
 * @type {Array < string >}
 */
const listAttributSelect: Record<listeTables, attributSelectInterface> = {
    "song": {
        primaryKey: `idPays`,
        attribut: [`idPays`, `nom`]
    },
    "facture": {
        primaryKey: `id`,
        attribut: [`id`, `date_payment`, `montant_ttc`, `source`, `created_at`, `update_at`, `user_id`]
    },
    // "creditcard": {
    //     primaryKey: `personne_id`,
    //     attribut: [`email`, `password`]
    // },
    
    "user": {
        primaryKey: `id`,
        attribut: [`id`, `firstname`, `lastname`, `email`, `user_password`, `date_naissance`, `sexe`, `subscription`, `createdat`, `updateat`, `roles`]
    },
};

export default listAttributSelect;