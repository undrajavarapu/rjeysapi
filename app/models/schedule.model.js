module.exports = (sequelize, Sequelize) => {
    const Schedule = sequelize.define("schedules", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true // If you want the ID to auto-increment
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false // Requires title to not be null
        },
        description: {
            type: Sequelize.STRING,
            // Example: Allow null but if provided, ensure it's of a certain length
            validate: {
                len: [10, 300] // Only allow strings with length between 10 and 300
            }
        },
        subject: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [10, 20] 
            }
        },
        frequency: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        repeat: {
            type: Sequelize.STRING, 
            allowNull: false,
        },
        time: {
            type: Sequelize.TIME, 
            allowNull: false,
        },
        
    }, {
        // Additional model options
        tableName: 'schedules',
        timestamps: false // Assuming your table doesn't use Sequelize default timestamps
    });

    return Schedule;
};
