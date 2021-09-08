const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User);
User.hasMany(
    Post,
    {
        onDelete: 'CASCADE'
    }
);

Comment.belongsTo(User);
User.hasMany(
    Comment,
    {
        onDelete: 'CASCADE'
    }
);

Comment.belongsTo(Post);
Post.hasMany(
    Comment,
    {
        onDelete: 'CASCADE'
    }
)

module.exports = { User, Post, Comment };
