const { Model } = require('sequelize');

class Favorite extends Model {

    static init(sequelize, DataTypes) {
        return super.init({
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull:{ msg: 'User is required.'}
                }
            },
            launchId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull:{ msg: 'Launch is required.'}
                }
            },
        }, {
            sequelize,
            tableName: 'Favorites',
            defaultScope: {
                attributes: { exclude: ['createdAt', 'updatedAt' ]}
            }
        });
    }
}

module.exports = Favorite;