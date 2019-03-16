import Knex = require('knex');

export class GenderModels {

    list(knex: Knex) {
        return knex('risk_gender')
    }

    save(knex: Knex, data: any) {
        return knex('risk_gender')
            .insert(data);
    }

    update(knex: Knex, id_gender: any, data: any) {
        return knex('risk_gender')
            .where('id_gender', id_gender)
            .update(data);
    }

    remove(knex: Knex, id_gender: any) {
        return knex('risk_gender')
            .where('id_gender', id_gender)
            .del();
    }
}