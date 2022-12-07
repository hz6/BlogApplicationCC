const { DataTypes, Model } = require('sequelize');
const sequelize = require('./dbConn');

class Blog extends Model { };

Blog.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    published_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {
    sequelize,
    modelName: 'blogs',
    createdAt: false,
    updatedAt: false
})

module.exports = { Blog };