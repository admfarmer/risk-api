import Knex = require('knex');

export class SubMenuItemModels {

  list(knex: Knex) {
    return knex('risk_query_report')
  }

  listother(knex: Knex) {
    return knex('risk_query_report')
      .where('status', '0');
  }

  listmanager(knex: Knex) {
    return knex('risk_query_report')
      .where('status', '1');
  }

  listdepart(knex: Knex) {
    return knex('risk_query_report')
      .where('status', '2');
  }

  listone(knex: Knex, query_id: any) {
    return knex('risk_query_report')
      .where('query_id', query_id);
  }

  save(knex: Knex, data: any) {
    return knex('risk_query_report')
      .insert(data);
  }

  update(knex: Knex, query_id: any, data: any) {
    return knex('risk_query_report')
      .where('query_id', query_id)
      .update(data);
  }

  remove(knex: Knex, query_id: any) {
    return knex('risk_query_report')
      .where('query_id', query_id)
      .del();
  }

}