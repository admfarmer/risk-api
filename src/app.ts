/// <reference path="../typings.d.ts" />

import path = require('path');
import * as HttpStatus from 'http-status-codes';
import * as fastify from 'fastify';

const serveStatic = require('serve-static');

require('dotenv').config({ path: path.join(__dirname, '../config') });

import { Server, IncomingMessage, ServerResponse } from 'http';

import helmet = require('fastify-helmet');

const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: {
    level: 'error',
    prettyPrint: true
  },
  bodyLimit: 5 * 1048576,
});

app.register(require('fastify-formbody'));
app.register(require('fastify-cors'), {});
app.register(require('fastify-no-icon'));
app.register(
  helmet,
  { hidePoweredBy: { setTo: 'PHP 5.2.0' } }
);

app.register(require('fastify-rate-limit'), {
  max: +process.env.MAX_CONNECTION_PER_MINUTE || 1000000,
  timeWindow: '1 minute'
});

app.use(serveStatic(path.join(__dirname, '../public')));

app.register(require('fastify-jwt'), {
  secret: process.env.SECRET_KEY
});

app.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
});

app.register(require('fastify-ws'), {});

app.decorate("authenticate", async (request, reply) => {
  let token: string = null;

  if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
    token = request.headers.authorization.split(' ')[1];
  } else if (request.query && request.query.token) {
    token = request.query.token;
  } else {
    token = request.body.token;
  }

  try {
    const decoded = await request.jwtVerify(token);
  } catch (err) {
    reply.status(HttpStatus.UNAUTHORIZED).send({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
      message: '401 UNAUTHORIZED!'
    })
  }
});

app.register(require('./db/conn'), {
  connection: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: +process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 0,
      max: 7,
      afterCreate: (conn, done) => {
        conn.query('SET NAMES utf8', (err) => {
          done(err, conn);
        });
      }
    },
    debug: false,
  },
  connectionName: 'db'
});

app.decorate('verifyAdmin', function (request, reply, done) {
  if (request.user.userType === 'ADMIN') {
    done();
  } else {
    reply.status(HttpStatus.UNAUTHORIZED).send({ statusCode: HttpStatus.UNAUTHORIZED, message: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
  }
});

app.decorate('verifyMember', function (request, reply, done) {
  if (request.user.userType === 'MEMBER') {
    done();
  } else {
    reply.status(HttpStatus.UNAUTHORIZED).send({ statusCode: HttpStatus.UNAUTHORIZED, message: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
  }
});

app.register(require('./routes/index'), { prefix: '/v1', logger: true });
app.register(require('./routes/login'), { prefix: '/v1/login', logger: true });
app.register(require('./routes/users'), { prefix: '/v1/users', logger: true });
app.register(require('./routes/persons'), { prefix: '/v1/persons', logger: true });
app.register(require('./routes/incidents'), { prefix: '/v1/incidents', logger: true });
app.register(require('./routes/departs'), { prefix: '/v1/departs', logger: true });
app.register(require('./routes/levels'), { prefix: '/v1/levels', logger: true });
app.register(require('./routes/accounts'), { prefix: '/v1/accounts', logger: true });
app.register(require('./routes/sides'), { prefix: '/v1/sides', logger: true });
app.register(require('./routes/safetys'), { prefix: '/v1/safetys', logger: true });
app.register(require('./routes/types'), { prefix: '/v1/types', logger: true });
app.register(require('./routes/notypes'), { prefix: '/v1/notypes', logger: true });

app.get('/', async (req: fastify.Request, reply: fastify.Reply) => {
  reply.code(200).send({ message: 'Welcome to Risk API services!' })
});

const port = +process.env.HTTP_PORT || 3000;
const host = process.env.HTTP_ADDRESS || '0.0.0.0';

app.listen(port, host, (err) => {
  if (err) throw err;

  console.log(app.server.address());
});
