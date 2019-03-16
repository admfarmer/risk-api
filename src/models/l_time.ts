import Knex = require('knex');

export class TimeMoldel {

    list(knex: Knex) {
        return knex('l_time')
    }

    save(knex: Knex, data: any) {
        return knex('l_time')
            .insert(data);
    }

    update(knex: Knex, time_id: any, data: any) {
        return knex('l_time')
            .where('time_id', time_id)
            .update(data);
    }

    remove(knex: Knex, time_id: any) {
        return knex('l_time')
            .where('time_id', time_id)
            .del();
    }

}