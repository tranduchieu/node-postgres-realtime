var pg = require('pg'),
    gearmanode = require('gearmanode'),
    gearmanClient,
    conString = 'postgres://postgres:pgtest@pgtest.kom.bi:5432/pgrealtime',
    pgClient;

gearmanode.Client.logger.transports.console.level = 'error';

gearmanClient = gearmanode.client();

console.log('LISTEN myEvent');
pgClient = new pg.Client(conString);
pgClient.connect();
pgClient.query('LISTEN myEvent');
pgClient.on('notification', function (data) {
    console.log("\033[34m" + new Date + '-\033[0m payload', data.payload);
    gearmanClient.submitJob('sms.sender.one', data.payload);
});