
var status = require('../../app/controllers/status');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/status')
        .get(queryBuilder.queryBuilder, status.list)
        .post(status.create);

    app.route('/api/status/:materialId')
        .get(status.read)
        .patch(status.update)
        .delete(status.delete);

    app.param('materialId', status.getById);
}