const db = require('../models');
const jwt = require('jsonwebtoken'); // to create jwts


exports.signin = async function(req, res, next){
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let {id, email} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({
          id,
          email
        },
        process.env.SECRET_KEY
      );

      return res.status(200).json({
        id,
        email,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password"
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: e.message
    });
  }

}

exports.signup = async function(req, res, next){
  try {
    let user = await db.User.create(req.body);
    let {id, firstname, lastname, email} = user;
    let token = jwt.sign(
      {
        id,
        email,
        firstname,
        lastname
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      firstname,
      lastname,
      email,
      token
    });

  } catch (e) {
    if (e.code === 11000) {
      e.message = "Sorry, that email is taken";
    }
    return next({
      status: 400,
      message: e.message
    });
  }
}
