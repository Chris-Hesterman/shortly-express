const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // if (req.cookies) {
  //   console.log(req.cookies);
  //   console.log('IM THE ONE RUNNING');
  // var token = req.cookies.session_id;
  // models.Sessions.get({ hash: token })
  //   .then((data) => {
  //     var userId = data.userId;
  //     models.Users.get({ id: userId }).then((user) => {
  //       req.session = { username: user.username };
  //     });
  // })
  // .catch((err) => {
  //   throw err;
  // });
  // } else {
  console.log(req.cookies);
  models.Sessions.create().then((hashRow) => {
    //console.log('*******************HASH ROW************************');
    //console.log('Hash: ', hashRow);
    models.Sessions.get({ id: hashRow.insertId }).then((hash) => {
      //console.log('*******************HASH ************************');
      //console.log(hash);
      res.cookie('session', hash.hash);
      console.log('******RES HEADERS******');
      console.log(res.headers);
      //console.log('Cookie ', res.cookies);
      // next(null, hash.hash);
    });
  });
  //}
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
