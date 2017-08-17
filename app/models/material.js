"use strict";
module.exports = function (sequelize, DataTypes) {
    var Material = sequelize.define("Material", {
        number: {
            type: DataTypes.STRING,
            allowNull: false
<<<<<<< HEAD
=======
            // unique: {
            //     args: true,
            //     msg: 'Material type must be unique.'
            // },
>>>>>>> Vishesh
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
<<<<<<< HEAD
                     Material.belongsTo(models.Status);
                }
            }
        }
=======
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
>>>>>>> Vishesh
    );

    return Material;
};