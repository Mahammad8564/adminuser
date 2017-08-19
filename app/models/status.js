"use strict";
module.exports = function (sequelize, DataTypes) {
    var Status = sequelize.define("Status", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
            classMethods: {
                associate: function (models) {
                    Status.hasMany(models.Material);
                }
            }
        }
    );

    return Status;
};