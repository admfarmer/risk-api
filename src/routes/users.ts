/// <reference path="../../typings.d.ts" />

import * as Knex from 'knex';
import * as fastify from 'fastify';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { UserModels } from '../models/user';

const userModel = new UserModels();

const router = (fastify, { }, next) => {

  var db: Knex = fastify.db;

  fastify.get('/', { beforeHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {

    try {
      const rs: any = await userModel.list(db);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.post('/selectID', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const idcard = req.body.idcard;
    // console.log(idcard);

    try {
      const rs: any = await userModel.listOne(db, idcard);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.get('/userOne/:username', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const username = req.params.username;

    try {
      const rs: any = await userModel.listOne(db, username);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK, results: rs })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.post('/', { beforeHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const info_data = req.body.data;

    const username = info_data.username;
    const password = info_data.password;
    const encPassword = crypto.createHash('md5').update(password).digest('hex');

    const idcard = info_data.idcard;
    const is_accept = info_data.isAccept;
    const chief_user = info_data.chiefUser;
    const maniger_user = info_data.managerUser;
    const user_type = info_data.userType;

    const data: any = {
      idcard: idcard,
      username: username,
      password: encPassword,
      is_accept: is_accept,
      chief_user: chief_user,
      maniger_user: maniger_user,
      user_type: user_type
    };

    try {
      await userModel.save(db, data);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.put('/:userId', { beforeHandler: [fastify.authenticate] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userId = req.params.userId;
    const info_data = req.body.data;

    const idcard = info_data.idcard;
    const is_accept = info_data.isAccept;
    const chief_user = info_data.chiefUser;
    const maniger_user = info_data.managerUser;
    const user_type = info_data.userType;
    const password = info_data.password;

    let info: any;

    if (password) {
      // const password = req.body.password;
      const encPassword = crypto.createHash('md5').update(password).digest('hex');

      this.info = {
        idcard: idcard,
        password: encPassword,
        is_accept: is_accept,
        chief_user: chief_user,
        maniger_user: maniger_user,
        user_type: user_type
      };
    } else {
      this.info = {
        idcard: idcard,
        is_accept: is_accept,
        chief_user: chief_user,
        maniger_user: maniger_user,
        user_type: user_type
      };
    }
    try {
      await userModel.update(db, userId, this.info);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.put('/changepass/:userId', { beforeHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userId = req.params.userId;
    const info_data = req.body.data;

    const password = info_data.password;
    const encPassword = crypto.createHash('md5').update(password).digest('hex');

    const info: any = {
      password: encPassword
    };

    try {
      await userModel.update(db, userId, info);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  fastify.delete('/:userId', { beforeHandler: [fastify.authenticate, fastify.verifyAdmin] }, async (req: fastify.Request, reply: fastify.Reply) => {
    const userId: any = req.params.userId;

    try {
      await userModel.remove(db, userId);
      reply.status(HttpStatus.OK).send({ statusCode: HttpStatus.OK })
    } catch (error) {
      fastify.log.error(error);
      reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR) })
    }
  })

  next();
}

module.exports = router;