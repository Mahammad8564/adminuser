"use strict";
module.exports = function (sequelize, DataTypes) {
    var Material = sequelize.define("Material", {
        number: {
            type: DataTypes.STRING,
            allowNull: false
            // unique: {
            //     args: true,
            //     msg: 'Material type must be unique.'
            // },
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
                }
            }
        }
     //,{
     //   indexes: [
     //       // Create a unique index title
     //       {
     //           unique: true,
     //           fields: ['title']
     // }]}
    );

    return Material;
};