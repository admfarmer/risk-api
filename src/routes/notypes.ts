/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';

import { NoTypeModels } from '../models/notype';

const noTypeModels = new NoTypeModels();

const router = (fastify, { }, next) => {

    var db: Knex = fastify.db;

    fastify.get('/', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {

        try {
            const rs: any = await noTypeModels.list(db);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.get('/:typeId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const typeId = req.params.typeId;

        try {
            const rs: any = await noTypeModels.select(db, typeId);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.post('/', { beforeHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const info_data = req.body.data;

        const sideId = info_data.sideId;
        const codeSafety = info_data.codeSafety;
        const nameSafety = info_data.nameSafety;

        const data: any = {
            side_id: sideId,
            code_safety: codeSafety,
            name_safety: nameSafety,
        };

        try {
            await noTypeModels.save(db, data);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.put('/:notypeId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const notypeId = req.params.notypeId;
        const info_data = req.body.data;

        const sideId = info_data.sideId;
        const codeSafety = info_data.codeSafety;
        const nameSafety = info_data.nameSafety;
        let info: any;

        this.info = {
            side_id: sideId,
            code_safety: codeSafety,
            name_safety: nameSafety,
        };

        try {
            await noTypeModels.update(db, notypeId, this.info);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.delete('/:notypeId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const notypeId: any = req.params.notypeId;

        try {
            await noTypeModels.remove(db, notypeId);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    next();
}

module.exports = router;