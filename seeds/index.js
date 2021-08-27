const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');

async function seedDatabase() {
    try {
        await sequelize.sync({ force: true });

        const users = await User.bulkCreate(
            userData,
            {
                individualHooks: true,
                returning: true
            }
        );

        process.exit(0);
    } catch (err) {
        console.error(err);
    }
}

seedDatabase();
