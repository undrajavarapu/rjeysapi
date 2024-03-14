const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;
//const Role = db.role;
const Project = db.project;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.createproject = async (req, res) => {
  // Save User to Database
  try {
    const project = await Project.create({
      projectname: req.body.name
    });
res.status(200).send({message:"Project Added Successful"})

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.project =  (req, res) => {
    // Save User to Database
    Project.findAll( {
      attributes: ['id','projectname'],
      limit: 5,
      order: [['id', 'DESC']]
  }).then(projects => {
      return res.status(200).json({
          projects
      })
  }).catch(err => {
      return res.status(400).json({err})
  })
  };