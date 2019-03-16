import Knex = require('knex');

export class AccountModels {

    list(knex: Knex) {
        return knex('risk_account')
            .orderBy('id_account', 'DESC')
    }
    selectacc(knex: Knex, code_account: any) {
        return knex('risk_account')
            .where('code_account', code_account)
    }

    select(knex: Knex, id_side: any, id_safety: any, id_type: any, id_notype: any) {
        return knex('risk_account')
            .where('id_side', id_side)
            .where('id_safety', id_safety)
            .where('id_type', id_type)
            .where('id_notype', id_notype)
    }

    save(knex: Knex, data: any) {
        return knex('risk_account')
            .insert(data);
    }

    update(knex: Knex, id_account: any, data: any) {
        return knex('risk_account')
            .where('id_account', id_account)
            .update(data);
    }

    remove(knex: Knex, id_account: any) {
        return knex('risk_account')
            .where('id_account', id_account)
            .del();
    }

}