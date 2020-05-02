const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (Object.keys(req.cookies).length) {
  } else {
    models.Sessions.create().then((session) => {
      models.Sessions.get({ id: session.insertId })
        .then((sessionRow) => {
          req.session = Object.assign({}, sessionRow);
          res.cookies = { shortlyid: { value: req.session.hash } };
          //var cookie = response.cookies.shortlyid.value;
          //console.log(req.session);
        })
        .then(() => {
          res.cookie('shortlyid', req.session.hash);
          console.log(res.cookies.sh);
          next();
        });
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
