import Knex = require('knex');

export class LocationMoldel {

    list(knex: Knex) {
        return knex('l_location')
    }

    save(knex: Knex, data: any) {
        return knex('l_location')
            .insert(data);
    }

    update(knex: Knex, location_id: any, data: any) {
        return knex('l_location')
            .where('location_id', location_id)
            .update(data);
    }

    remove(knex: Knex, location_id: any) {
        return knex('l_location')
            .where('location_id', location_id)
            .del();
    }

}