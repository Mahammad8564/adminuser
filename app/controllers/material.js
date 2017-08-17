﻿var models = require('../models');
var Material = models.Material;
var User = models.User;
var Status = models.Status;
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
    req.options.include = [{ model: Status, attributes: ["title", "id"] }];
    Material.findAndCountAll(req.options).then(function (arrs) {
        res.setHeader('total', arrs.count);
        res.json(arrs.rows);
    }).catch(function (err) {
        console.log(err);
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.read = function (req, res) {
    res.json(req.material);
}

exports.getById = function (req,res,next) {
    Material.findOne({
        where: { id: req.params.materialId},
        include: [{ model: Status, attributes: ["title", "id"] }]
        //include: []
    }).then(function (obj) {
        req.material = obj;
        next();
    }).catch(function (err) {
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.search = function (req,res,next) {
    Material.find({
        where: { number: req.body.number, mobileNumber: req.body.mobileNumber},
        include: [{ model: Status, attributes: ["title", "id"] }]
    }).then(function (obj) {
        obj ? res.json(obj) : res.status(204).send({ message: 'No Records Found' });
    }).catch(function (err) {
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.create = function (req, res) {
    Material.create(req.body).then(function (obj) {
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
    var material = req.material;
    _.forEach(req.body, function (val, key) {
        material.dataValues[key] = val;
    });
    Material.update(material.dataValues, {
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
    Material.destroy({
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