import Knex = require('knex');

export class TypeModels {

    list(knex: Knex) {
        return knex('risk_type')
    }

    select(knex: Knex, id_safety: any) {
        return knex('risk_type')
            .where('id_safety', id_safety)
    }

    save(knex: Knex, data: any) {
        return knex('risk_type')
            .insert(data);
    }

    update(knex: Knex, id_type: any, data: any) {
        return knex('risk_type')
            .where('id_type', id_type)
            .update(data);
    }

    remove(knex: Knex, id_type: any) {
        return knex('risk_type')
            .where('id_type', id_type)
            .del();
    }

}