"use strict";
module.exports = function (sequelize, DataTypes) {
    var Material = sequelize.define("Material", {
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    }, {
            classMethods: {
                associate: function (models) {
                     Material.belongsTo(models.Status);
                }
            }
        }
    );

    return Material;
};