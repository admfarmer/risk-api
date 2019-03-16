import Knex = require('knex');

export class UserModels {
  tableName: string = 'risk_user';

  list(knex: Knex) {
    return knex.select('u.*', 'p.title', 'p.first_name', 'p.last_name', 'p.telephone', 'p.email')
      .from('risk_user as u')
      .innerJoin('risk_person as p', { 'p.idcard': 'u.idcard' })
    // .limit(10);
  }

  listOne(knex: Knex, idcard: string) {
    return knex.select('u.*', 'p.title', 'p.first_name', 'p.last_name', 'p.telephone', 'p.email')
      .from('risk_user as u')
      .innerJoin('risk_person as p', { 'p.idcard': 'u.idcard' })
      .where('u.idcard', idcard);
  }

  listpass(knex: Knex, idcard: any) {
    return knex(this.tableName)
      .where('idcard', idcard)
  }

  save(knex: Knex, data: any) {
    return knex(this.tableName)
      .insert(data);
  }

  update(knex: Knex, userId: any, data: any) {
    return knex(this.tableName)
      .where('id_user', userId)
      .update(data);
  }

  remove(knex: Knex, userId: any) {
    return knex(this.tableName)
      .where('id_user', userId)
      .del();
  }

  login(knex: Knex, username: any, password: any) {
    return knex.select('u.*', 'p.first_name', 'p.last_name')
      .from('risk_user as u')
      .innerJoin('risk_person as p', { 'p.idcard': 'u.idcard' })
      .where({
        'u.username': username,
        'u.password': password,
        'u.is_accept': 'Y'
      })
      .limit(1);
  }

  saveDeviceToken(knex: Knex, Token: any, deviceToken: any) {
    return knex(this.tableName)
      .where('username', deviceToken)
      .update('device_token', Token);
  }

}