import * as knex from 'knex';

export class SystemModel {

  getInfo(db: knex) {
    return db('risk_system').select();
  }
}