const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;
//const Role = db.role;
const Schedule = db.schedule;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.listAllSchedules = (req, res) => {
  const search = req.query.search;

  const query = {
    attributes: ['id', 'title', 'description', 'subject', 'frequency', 'repeat', 'time'],
    order: [['id', 'DESC']]
  };

  if (search) {
    query.where = {
      title: {
        [db.Sequelize.Op.like]: `%${search}%`
      }
    };
  }

  Schedule.findAll(query)
    .then(schedules => {
      res.status(200).json(schedules);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};


exports.getScheduleById = (req, res) => {
  const id = req.params.id
  console.log(id)

  Schedule.findByPk(id)
    .then(schedule => {
      if (schedule) {
        res.status(200).json(schedule);
      } else {
        res.status(404).json({ error: 'Schedule not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

exports.createSchedule = (req, res) => {

  Schedule.create(req.body)
    .then(schedule => {
      res.status(201).json(schedule);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

exports.updateSchedule = (req, res) => {
  const id = req.params.id;

  Schedule.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num[0] === 1) {
        res.status(200).json({ message: 'Schedule updated successfully.' });
      } else {
        res.status(404).json({ error: 'Schedule not found or nothing to update' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};

exports.deleteSchedule = (req, res) => {
  const id = req.params.id;

  Schedule.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).json({ message: 'Schedule deleted successfully.' });
      } else {
        res.status(404).json({ error: 'Schedule not found' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
};