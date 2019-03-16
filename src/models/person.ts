import Knex = require('knex');

export class PersonMoldel {

    list(knex: Knex) {
        return knex('risk_person')
            .orderBy('first_name', 'ASC')
    }

    select(knex: Knex) {
        return knex('risk_person as p')
            .select('p.*')
            .select(knex.raw(`s.sex_name as sex_name,d.name_depart as name_depart,pos.pos_name as pos_name`))
            .innerJoin('l_sex as s', { 's.sex_id': 'p.sex' })
            .innerJoin('risk_depart as d', { 'd.code_depart': 'p.depart' })
            .innerJoin('risk_position as pos', { 'pos.id_pos': 'p.position' })
            .orderBy('p.first_name', 'ASC')
    }

    selectjoin(knex: Knex) {
        var subquery = knex('risk_user').select('idcard');
        return knex('risk_person')
            .where(function () {
                this.where('idcard', 'not in', subquery)
            })
    }

    selectcard(knex: Knex, idcard: any) {
        // console.log(idcard);
        return knex('risk_person as p')
            .select('p.*')
            .select('d.*')
            .select(knex.raw(`s.sex_name as sex_name,d.name_depart as name_depart,pos.pos_name as pos_name`))
            .innerJoin('l_sex as s', { 's.sex_id': 'p.sex' })
            .innerJoin('risk_depart as d', { 'd.code_depart': 'p.depart' })
            .innerJoin('risk_position as pos', { 'pos.id_pos': 'p.position' })
            .where('idcard', idcard)
            .orderBy('p.first_name', 'ASC')
    }

    selectChief(knex: Knex, idcard: any) {
        // console.log(idcard);
        return knex('risk_person as p')
            .select('p.*')
            .select(knex.raw(`s.sex_name as sex_name,d.name_depart as name_depart,pos.pos_name as pos_name`))
            .innerJoin('l_sex as s', { 's.sex_id': 'p.sex' })
            .innerJoin('risk_depart as d', { 'd.code_depart': 'p.depart' })
            .innerJoin('risk_position as pos', { 'pos.id_pos': 'p.position' })
            .where('personla', idcard)
            .orderBy('p.first_name', 'ASC')
    }

    save(knex: Knex, data: any) {
        return knex('risk_person')
            .insert(data);
    }

    update(knex: Knex, id_person: any, data: any) {
        return knex('risk_person')
            .where('id_person', id_person)
            .update(data);
    }

    remove(knex: Knex, id_person: any) {
        return knex('risk_person')
            .where('id_person', id_person)
            .del();
    }

}