import Knex = require('knex');

export class TitleMoldel {

    list(knex: Knex) {
        return knex('l_title')
    }

    save(knex: Knex, data: any) {
        return knex('l_title')
            .insert(data);
    }

    update(knex: Knex, title_id: any, data: any) {
        return knex('l_title')
            .where('title_id', title_id)
            .update(data);
    }

    remove(knex: Knex, title_id: any) {
        return knex('l_title')
            .where('title_id', title_id)
            .del();
    }

}