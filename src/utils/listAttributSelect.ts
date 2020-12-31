export type listeTables = "facture" | "creditcard" | "personne" | "song" | "user";

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
    "personne": {
        primaryKey: `id`,
        attribut: [`id`, `firstname`, `lastname`, `date_naissance`, `sexe`, `created_at`, `updated_at`, `subscription`, `roles`]
    },
    "song": {
        primaryKey: `idPays`,
        attribut: [`idPays`, `nom`]
    },
    "facture": {
        primaryKey: `personne_idpersonne`,
        attribut: [`email`, `password`, `personne_idpersonne`]
    },
    "creditcard": {
        primaryKey: `personne_id`,
        attribut: [`email`, `password`, `personne_idpersonne`]
    },
    
    "user": {
        primaryKey: `id`,
        attribut: [`id`, `email`, `lastname`, `date_naissance`, `sexe`, `created_at`, `updated_at`, `subscription`, `roles`]
    },
};

export default listAttributSelect;