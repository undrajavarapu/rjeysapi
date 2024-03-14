module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("productlist", {
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
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true, // Checks for valid integer
                min: 0 // Disallow negative prices
            }
        },
        discountPercentage: {
            type: Sequelize.FLOAT,
            validate: {
                isFloat: true, // Checks for valid floating point numbers
                min: 0,
                max: 100
            }
        },
        rating: {
            type: Sequelize.FLOAT,
            defaultValue: 0, // Example of setting a default value
            validate: {
                isFloat: true,
                min: 0,
                max: 5
            }
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            validate: {
                isInt: true,
                min: 0
            }
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            validate: {
                isUrl: true // Validates that the image field contains a valid URL
            }
        },
    }, {
        // Additional model options
        tableName: 'productlist',
        timestamps: false // Assuming your table doesn't use Sequelize default timestamps
      }
    );

    return Product;
    
    
};

const getPagination = (page, size) => {
    const limit = size ? +size : 10; // Default limit to 10 items per page
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };

