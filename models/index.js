const User = require('./user');
const Post = require('./Post');

Post.belongsTo(User);
User.hasMany(
    Post,
    {
        onDelete: 'CASCADE'
    }
);

module.exports = { User, Post };
