const db = require('../models');
console.log('inside handler');


exports.listTeams = async function(req, res, next) {
  try {
    let teams = await db.Team.find()
      .sort({ createdAt: "desc" });
    return res.status(200).json(teams);
  } catch (err) {
    return next(err);
  }
};

exports.createTeam = async function(req, res, next) {
  try {
    console.log('inside create');

    console.log(req.body);
    let team = await db.Team.create(req.body);
    return res.status(200).json(team);
  } catch (err) {
    return next(err);
  }
};

exports.getTeam = async function(req, res, next) {
  try {
    console.log('inside getTeam');

    let team = await db.Team.findById(req.params.id);
    return res.status(200).json(team);
  } catch (err) {
    return next(err);
  }
};

exports.deleteTeam = async function(req, res, next) {
  try {
    console.log('inside delete');

    let team = await db.Team.findById(req.params.id);
    await team.remove();

    return res.status(200).json(team);
  } catch (err) {
    return next(err);
  }
};
