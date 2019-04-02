import Knex = require('knex');

export class PositionMoldel {

    list(knex: Knex) {
        return knex('risk_position')
    }

    save(knex: Knex, data: any) {
        return knex('risk_position')
            .insert(data);
    }

    update(knex: Knex, id_pos: any, data: any) {
        return knex('risk_position')
            .where('id_pos', id_pos)
            .update(data);
    }

    remove(knex: Knex, id_pos: any) {
        return knex('risk_position')
            .where('id_pos', id_pos)
            .del();
    }

}