import Knex = require('knex');

export class InciDentModels {

    listNotChief(knex: Knex) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .select(knex.raw(`d.name_depart as depart`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .innerJoin(`risk_depart as d`, 'd.id_depart', 'r.dep_rep_id')
            .where(function () {
                this.where('r.conf_chief', '0')
                    .orWhere('r.conf_chief', '=', '')
                    .orWhereNull('r.conf_chief')
            })
            .orderBy('r.date_incident', 'desc');
    }

    listChief(knex: Knex) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .select(knex.raw(`d.name_depart as depart`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .innerJoin(`risk_depart as d`, 'd.id_depart', 'r.dep_rep_id')
            .where(function () {
                this.where('r.conf_chief', '1')
            })
            .orderBy('r.date_incident', 'desc');
    }

    listNotOutput(knex: Knex) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .andWhere(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.orWhere('r.conf_output', '=', '0')
                            .orWhere('r.conf_output', '=', '')
                            .orWhereNull('r.conf_output')
                    })

            })
            .orderBy('r.date_incident', 'desc');
    }

    listOutput(knex: Knex) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .andWhere(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.andWhere('r.conf_output', '1')
                    })

            })
            .orderBy('r.date_incident', 'desc');
    }

    selectIn(knex: Knex, dep_rep_one: any, dep_res_group: any) {
        let subquery = knex('risk_depart').select('id_depart').where('code_group', dep_res_group);

        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '0')
                    .orWhere('r.conf_chief', '=', '')
                    .orWhereNull('r.conf_chief')
            })
            .andWhere(function () {
                this.where('r.dep_rep_id', dep_rep_one)
                    .orWhere('r.dep_rep_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC');
    }

    selectInOne(knex: Knex, dep_rep_one: any) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '0')
                    .orWhere('r.conf_chief', '=', '')
                    .orWhereNull('r.conf_chief')
            })
            .andWhere(function () {
                this.where('r.dep_rep_id', dep_rep_one)
            })
            .orderBy('r.date_incident', 'DESC');
    }

    selectOut(knex: Knex, dep_rep_one: any, dep_res_group: any) {
        let subquery = knex('risk_depart').select('id_depart').where('code_group', dep_res_group);

        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
            })
            .andWhere(function () {
                this.where('r.dep_rep_id', dep_rep_one)
                    .orWhere('r.dep_rep_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC');
    }

    selectOutOne(knex: Knex, dep_rep_one: any) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
            })
            .andWhere(function () {
                this.where('r.dep_rep_id', dep_rep_one)
            })
            .orderBy('r.date_incident', 'DESC');
    }

    selectShowIn(knex: Knex, dep_res_one: any, dep_res_group: any) {
        var subquery = knex('risk_depart as d').where('d.code_group', dep_res_group).select('d.id_depart');
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.orWhere('r.conf_output', '=', '0')
                            .orWhere('r.conf_output', '=', '')
                            .orWhereNull('r.conf_output')
                    })
            })
            .andWhere(function () {
                this.where('r.dep_res_id', dep_res_one)
                    .orWhere('r.dep_res_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC')
    }

    selectShowInOne(knex: Knex, dep_res_one: any) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.orWhere('r.conf_output', '=', '0')
                            .orWhere('r.conf_output', '=', '')
                            .orWhereNull('r.conf_output')
                    })
            })
            .andWhere(function () {
                this.where('r.dep_res_id', dep_res_one)
            })
            .orderBy('r.date_incident', 'DESC')
    }

    selectShowOut(knex: Knex, dep_res_one: any, dep_res_group: any) {
        var subquery = knex('risk_depart as d').where('d.code_group', dep_res_group).select('d.id_depart');
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.where('r.conf_output', '1')
                    })
            })
            .andWhere(function () {
                this.where('r.dep_res_id', dep_res_one)
                    .orWhere('r.dep_res_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC')
    }

    selectShowOutOne(knex: Knex, dep_res_one: any) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.where('r.conf_output', '1')
                    })
            })
            .andWhere(function () {
                this.where('r.dep_res_id', dep_res_one)
            })
            .orderBy('r.date_incident', 'DESC')
    }


    save(knex: Knex, data: any) {
        return knex('risk_incident')
            .insert(data);
    }

    update(knex: Knex, id_incident: any, data: any) {
        return knex('risk_incident')
            .where('id_incident', id_incident)
            .update(data);
    }

    remove(knex: Knex, id_incident: any) {
        return knex('risk_incident')
            .where('id_incident', id_incident)
            .del();
    }

    //// ++++++++++++++++++++++++++++++++++++++++++ ////    

    Quality(knex: Knex, quality: any) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .select(knex.raw(`d.name_depart as name_depart`))
            .innerJoin('risk_depart as d', 'd.id_depart', '=', 'r.dep_res_id')
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .innerJoin('risk_type as t', function () {
                this.on('t.id_type', '=', 'r.id_type')
            })
            .where(function () {
                this.where('t.id_depart', quality)
                    .orWhere('r.dep_res_id', quality)
            })
    }

    QualityIN(knex: Knex, quality: any) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .select(knex.raw(`d.name_depart as name_depart`))
            .innerJoin('risk_depart as d', 'd.id_depart', '=', 'r.dep_res_id')
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .innerJoin('risk_type as t', function () {
                this.on('t.id_type', '=', 'r.id_type')
            })
            .where(function () {
                this.where('t.id_depart', quality)
                    .orWhere('r.dep_res_id', quality)
            })
            .andWhere(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.orWhere('r.conf_output', '=', '0')
                            .orWhere('r.conf_output', '=', '')
                            .orWhereNull('r.conf_output')
                    })

            })
    }

    QualityOUT(knex: Knex, quality: any) {
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .select(knex.raw(`d.name_depart as name_depart`))
            .innerJoin('risk_depart as d', 'd.id_depart', '=', 'r.dep_res_id')
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .innerJoin('risk_type as t', function () {
                this.on('t.id_type', '=', 'r.id_type')
            })
            .where(function () {
                this.where('t.id_depart', quality)
            })
            .andWhere(function () {
                this.where('r.conf_chief', '0')
                    .orWhere('r.conf_chief', '=', '')
                    .orWhereNull('r.conf_chief')
            })
    }




    listInraw(knex: Knex, dep_res_one: any, dep_res_two: any, dep_res_group: any) {
        var subquery = knex('risk_depart as d').where('d.code_group', dep_res_group).select('d.id_depart');
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
                    .andWhere(function () {
                        this.orWhere('r.conf_output', '=', '0')
                            .orWhere('r.conf_output', '=', '')
                            .orWhereNull('r.conf_output')
                    })
            })
            .andWhere(function () {
                this.where('r.dep_res_id', dep_res_one)
                    .orWhere('r.dep_res_id', dep_res_two)
                    .orWhere('r.dep_res_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC')
    }

    listOutraw(knex: Knex, dep_rep_one: any, dep_rep_two: any, dep_res_group: any) {
        var subquery = knex('risk_depart as d').where('d.code_group', dep_res_group).select('d.id_depart');
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '0')
                this.orWhere('r.conf_chief', '=', '')
                    .orWhereNull('r.conf_chief')
            })
            .andWhere(function () {
                this.where('r.dep_rep_id', dep_rep_one)
            })
            .orWhere(function () {
                this.where('r.dep_rep_id', dep_rep_two)
                    .orWhere('r.dep_rep_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC')
    }


    listShowInraw(knex: Knex, dep_res_one: any, dep_res_two: any, dep_res_group: any) {
        var subquery = knex('risk_depart as d').where('d.code_group', dep_res_group).select('d.id_depart');
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
            })
            .andWhere(function () {
                this.where('r.dep_res_id', dep_res_one)
                    .orWhere('r.dep_res_id', dep_res_two)
                    .orWhere('r.dep_res_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC')
    }

    listShowOutraw(knex: Knex, dep_rep_one: any, dep_rep_two: any, dep_res_group: any) {
        var subquery = knex('risk_depart as d').where('d.code_group', dep_res_group).select('d.id_depart');
        return knex('risk_incident as r')
            .select('r.*')
            .select(knex.raw(`l.location_name as location_name`))
            .select(knex.raw(`i.time_name as time_name`))
            .innerJoin('l_time as i', 'i.time_id', '=', 'r.time_incident')
            .innerJoin('l_location as l', 'l.location_id', '=', 'r.location_incident')
            .where(function () {
                this.where('r.conf_chief', '1')
            })
            .andWhere(function () {
                this.where('r.dep_rep_id', dep_rep_one)
            })
            .orWhere(function () {
                this.where('r.dep_rep_id', dep_rep_two)
                    .orWhere('r.dep_rep_id', 'in', subquery)
            })
            .orderBy('r.date_incident', 'DESC')
    }

}