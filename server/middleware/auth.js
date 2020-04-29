const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  if (req.cookies) {
    var token = req.cookies.session_id;

    models.Sessions.get({ hash: token })
      .then((data) => {
        var userId = data.userId;

        models.Users.get({ id: userId }).then((user) => {
          req.session = { username: user.username };
        });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    models.Sessions.create().then((hash) => {
      console.log('*******************HASH************************');
      console.log('Hash: ', hash);
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
