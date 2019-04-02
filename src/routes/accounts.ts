/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';

import { AccountModels } from '../models/account';

const accountModels = new AccountModels();

const router = (fastify, { }, next) => {

    var db: Knex = fastify.db;

    fastify.get('/', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {

        try {
            const rs: any = await accountModels.list(db);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.get('/select/:code_account', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const code_account = req.params.code_account;
        console.log(code_account);
        try {
            const rs: any = await accountModels.selectacc(db, code_account);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.delete('/:accountId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const accountId: any = req.params.accountId;

        try {
            await accountModels.remove(db, accountId);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })


    next();
}

module.exports = router;