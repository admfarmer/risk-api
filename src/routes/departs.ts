/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { DepartMoldel } from '../models/depart';

const departMoldel = new DepartMoldel();

const router = (fastify, { }, next) => {

    var db: Knex = fastify.db;

    fastify.get('/', { beforeHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {

        try {
            const rs: any = await departMoldel.list(db);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })
    fastify.get('/selectDepartGPE/:code_group', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const code_group = req.params.code_group;
        console.log(code_group);
        try {
            const rs: any = await departMoldel.selectGPE(db, code_group);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })


    // fastify.post('/', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {

    //     const idcard = req.body.idcard;
    //     const info_data = req.body.data;

    //     const is_accept = info_data.is_accept;
    //     const chief_user = info_data.chief_user;
    //     const maniger_user = info_data.maniger_user;
    //     const userType = info_data.userType;
    //     let info: any;

    //     this.info = {
    //         idcard: idcard,
    //         is_accept: is_accept,
    //         chief_user: chief_user,
    //         maniger_user: maniger_user,
    //         user_type: userType
    //     };

    //     try {
    //         await departMoldel.save(db, this.info);
    //         reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    //     } catch (error) {
    //         fastify.log.error(error);
    //         reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    //     }
    // })

    // fastify.put('/:userId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    //     const personId = req.params.personId;
    //     const info_data = req.body.data;

    //     const idcard = info_data.idcard;
    //     const is_accept = info_data.is_accept;
    //     const chief_user = info_data.chief_user;
    //     const maniger_user = info_data.maniger_user;
    //     const userType = info_data.userType;
    //     const password = info_data.password;
    //     let info: any;

    //     this.info = {
    //         idcard: idcard,
    //         is_accept: is_accept,
    //         chief_user: chief_user,
    //         maniger_user: maniger_user,
    //         user_type: userType
    //     };

    //     try {
    //         await departMoldel.update(db, personId, this.info);
    //         reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    //     } catch (error) {
    //         fastify.log.error(error);
    //         reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    //     }
    // })

    // fastify.delete('/:personId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    //     const personId: any = req.params.personId;

    //     try {
    //         await departMoldel.remove(db, personId);
    //         reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    //     } catch (error) {
    //         fastify.log.error(error);
    //         reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    //     }
    // })

    next();
}

module.exports = router;