/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';

import { LevelMoldel } from '../models/level';

const levelMoldel = new LevelMoldel();

const router = (fastify, { }, next) => {

    var db: Knex = fastify.db;

    fastify.get('/', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {

        try {
            const rs: any = await levelMoldel.list(db);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.get('/select/:id_side', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const id_side = req.params.id_side;
        console.log(id_side);
        try {
            const rs: any = await levelMoldel.select(db, id_side);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.post('/', { beforeHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const info_data = req.body.data;

        const codeLevel = info_data.codeLevel;
        const nameLevel = info_data.nameLevel;
        const groupLevel = info_data.groupLevel;

        const data: any = {
            code_level: codeLevel,
            name_level: nameLevel,
            group_level: groupLevel,
        };

        try {
            await levelMoldel.save(db, data);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.put('/:levelId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const levelId = req.params.levelId;
        const info_data = req.body.data;

        const codeLevel = info_data.codeLevel;
        const nameLevel = info_data.nameLevel;
        const groupLevel = info_data.groupLevel;
        let info: any;

        this.info = {
            code_level: codeLevel,
            name_level: nameLevel,
            group_level: groupLevel,
        };

        try {
            await levelMoldel.update(db, levelId, this.info);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })

    fastify.delete('/:levelId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
        const levelId: any = req.params.levelId;

        try {
            await levelMoldel.remove(db, levelId);
            reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
        } catch (error) {
            fastify.log.error(error);
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
        }
    })



    next();
}

module.exports = router;