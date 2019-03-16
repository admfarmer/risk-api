/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';

import { TypeModels } from '../models/type';

const typeModels = new TypeModels();

const router = (fastify, { }, next) => {

    var db: Knex = fastify.db;

    fastify.get('/', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {

        try {
            const rs: any = await typeModels.list(db);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.get('/:safetyId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const safetyId = req.params.safetyId;

        try {
            const rs: any = await typeModels.select(db, safetyId);
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
            await typeModels.save(db, data);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.put('/:typeId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const typeId = req.params.typeId;
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
            await typeModels.update(db, typeId, this.info);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.delete('/:typeId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const typeId: any = req.params.typeId;

        try {
            await typeModels.remove(db, typeId);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    next();
}

module.exports = router;