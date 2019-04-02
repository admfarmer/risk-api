import Knex = require('knex');

export class SafetyModels {

    list(knex: Knex) {
        return knex('risk_safety')
    }

    select(knex: Knex, id_side: any) {
        return knex('risk_safety')
            .where('id_side', id_side)
    }

    save(knex: Knex, data: any) {
        return knex('risk_safety')
            .insert(data);
    }

    update(knex: Knex, id_safety: any, data: any) {
        return knex('risk_safety')
            .where('id_safety', id_safety)
            .update(data);
    }

    remove(knex: Knex, id_safety: any) {
        return knex('risk_safety')
            .where('id_safety', id_safety)
            .del();
    }

}