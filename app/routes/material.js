
var material = require('../../app/controllers/material');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/material')
        .get(queryBuilder.queryBuilder, material.list)
        .post(material.create);

    app.route('/api/material/:materialId')
        .get(material.read)
        .patch(material.update)
        .delete(material.delete);

        app.route('/api/materialSearch')
        .post(material.search);

    app.param('materialId', material.getById);
}