const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;
//const Role = db.role;
const Product = db.product;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createproduct = async (req, res) => {
  // Save User to Database
  try {
   // const { title, description, price, discountPercentage, rating, stock, brand, category, image } = req.body;

        if (!title || !description || !price || !discountPercentage || !rating || !stock || !brand || !category || !image) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    const product = await Product.create(
        { title, description, price, discountPercentage, rating, stock, brand, category, image } = req.body
    );
res.status(200).send({message:"Product Added Successful"})

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    return res.status(500).json({ message: 'Internal server error' });
}
}

const getPagination = (page, size) => {
    const limit = size ? +size : 2; // Default limit to 10 items per page
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };
exports.product = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 0; // Default to page 0 if not specified
    const size = parseInt(req.query.size, 10); // Optional: Allow client to specify size, otherwise use default in `getPagination`
  
    const { limit, offset } = getPagination(page, size);
  
    try {
      const { count: totalItems, rows: products } = await Product.findAndCountAll({
        limit,
        offset,
        order: [['id', 'DESC']],
        // include other query parameters as needed
      });
  
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(totalItems / limit);
  
      res.json({
        totalItems,
        products,
        totalPages,
        currentPage,
      });
    } catch (error) {
      res.status(500).send({
        message: "Error retrieving products",
        error: error.message,
      });
    }
  };



  exports.updateproduct = async (req, res) => {
    const { id } = req.params; // Assuming the product ID is passed as a URL parameter
    try {
        // Attempt to update the product with the provided data
        // The second argument to `update` specifies which record(s) to update
        const [updated] = await Product.update(req.body, {
            where: { id: id },
            individualHooks: true, // Ensure that before/after update hooks are run if defined
        });

        if (updated) {
            // If the update was successful, fetch the updated product to return it
            const updatedProduct = await Product.findByPk(id);
            return res.status(200).json(updatedProduct);
        } else {
            // No records updated (possibly because the product was not found)
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Handle validation errors
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        // Handle other errors
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params; // Assuming the product ID is passed as a URL parameter

    try {
        // Attempt to delete the product
        const deleted = await Product.destroy({
            where: { id: id }
        });

        if (deleted) {
            // If the delete operation was successful, send a confirmation response
            return res.status(200).json({ message: 'Product successfully deleted' });
        } else {
            // If the product was not found or not deleted for some reason
            return res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        // Handle potential errors
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
