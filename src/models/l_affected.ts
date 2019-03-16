import Knex = require('knex');

export class AffectedMoldel {

    list(knex: Knex) {
        return knex('l_affected')
    }

    save(knex: Knex, data: any) {
        return knex('l_affected')
            .insert(data);
    }

    update(knex: Knex, affected_id: any, data: any) {
        return knex('l_affected')
            .where('affected_id', affected_id)
            .update(data);
    }

    remove(knex: Knex, affected_id: any) {
        return knex('l_affected')
            .where('affected_id', affected_id)
            .del();
    }

}