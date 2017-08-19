var models = require('../models');
var Status = models.Status;
var User = models.User;
var Sequelize = require('sequelize');
var _ = require('underscore');

// {
//     "title" : "Active",
//     "isActive" : true
// }

//get Error Message Consized
var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errorName in err.errors) {
            if (err.errors[errorName].message) {
                return err.errors[errorName].message;
            }
        }
    } else {
        return 'Unknown Server Error';
    }
}

//getting List of 
//For Geting list of Materials
exports.list = function (req, res) {
    Status.findAndCountAll(req.options).then(function (arrs) {
        res.setHeader('total', arrs.count);
        res.json(arrs.rows);
    }).catch(function (err) {
        console.log(err);
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.read = function (req, res) {
    res.json(req.Status);
}

exports.getById = function (req, res, next) {
    Status.findOne({
        where: { id: req.params.materialId },
        //include: []
    }).then(function (obj) {
        req.Status = obj;
        next();
    }).catch(function (err) {
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.create = function (req, res) {
    Status.create(req.body).then(function (obj) {
        if (!obj) {
            return res.send({ message: "Error Occured while updataing" });
        }
        var objData = obj.get({
            plain: true
        });
        res.json(objData);
    }).catch(function (error) {
        res.status(400).status(500).send({ message: getErrorMessage(error) });
    });
}

exports.update = function (req, res) {
    var Status = req.Status;
    _.forEach(req.body, function (val, key) {
        Status.dataValues[key] = val;
    });
    Status.update(Status.dataValues, {
        where: {
            id: req.params.materialId
        }
    })
        .then(function (obj) {
            return res.json(obj);
        }).catch(function (error) {
            return res.status(400).send({ message: getErrorMessage(error) });
        });

}

exports.delete = function (req, res) {
    console.log(req.params);
    Status.destroy({
        where: {
            id: req.params.materialId
        }
    })
        .then(function (obj) {
            return res.json(obj);
        }).catch(function (error) {
            return res.status(400).send({ message: getErrorMessage(error) });
        });

}