import Knex = require('knex');

export class LevelMoldel {

    list(knex: Knex) {
        return knex('risk_level')
    }

    select(knex: Knex, id_side: any) {
        return knex('risk_level')
            .where('group_level', id_side)
    }

    save(knex: Knex, data: any) {
        return knex('risk_level')
            .insert(data);
    }

    update(knex: Knex, levelId: any, data: any) {
        return knex('risk_level')
            .where('id_level', levelId)
            .update(data);
    }

    remove(knex: Knex, levelId: any) {
        return knex('risk_level')
            .where('id_level', levelId)
            .del();
    }

}