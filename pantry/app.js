const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const metricsRouter = require('./routes/metrics');

const {roomAuthenticator, identityAuthenticator} = require('./auth');
const {controller} = require('./routes/controller');
const modMessageRouter = require('./routes/modMessage');
const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json({limit: "500kb"}));

app.use('/', indexRouter);
app.use('/metrics', metricsRouter);

app.use('/api/v1/', controller('rooms', roomAuthenticator, (id) => id, () => 'room-info'));
app.use('/api/v1/rooms/:id/modMessage', modMessageRouter);

app.use('/api/v1/', controller('identities', identityAuthenticator));


module.exports = app;
