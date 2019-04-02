import Knex = require('knex');

export class SideModels {

    list(knex: Knex) {
        return knex('risk_side')
    }

    select(knex: Knex, id_side: any) {
        return knex('risk_side')
            .where('id_side', id_side)
    }

    save(knex: Knex, data: any) {
        return knex('risk_side')
            .insert(data);
    }

    update(knex: Knex, id_side: any, data: any) {
        return knex('risk_side')
            .where('id_side', id_side)
            .update(data);
    }

    remove(knex: Knex, id_side: any) {
        return knex('risk_side')
            .where('id_side', id_side)
            .del();
    }

}