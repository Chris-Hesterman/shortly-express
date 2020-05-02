const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  console.log(req.body);
  if (Object.keys(req.cookies).length) {
    console.log('I HAVE A COOKIE TO WORK WITH');
    models.Sessions.get({ hash: req.cookies.shortlyid }).then((sessionRow) => {
      //console.log(sessionRow);
      if (sessionRow && sessionRow.userId) {
        models.Users.get({ id: sessionRow.userId }).then((usersRow) => {
          console.log(sessionRow);
          req.session = {
            id: sessionRow.id,
            hash: sessionRow.hash,
            userId: sessionRow.userId,
            user: { username: usersRow.username }
          };
          console.log('******REQ SESSION OBJ******');
          console.log(req.session);
          next();
        });
      } else {
        console.log('NO USERID FOR THIS HASH');
        models.Sessions.delete({ hash: req.cookies.shortlyid }).then(() => {
          models.Sessions.create().then((session) => {
            models.Sessions.get({ id: session.insertId }).then((sessionRow) => {
              req.session = Object.assign({}, sessionRow);
              res.cookies = { shortlyid: { value: req.session.hash } };
              res.cookie('shortlyid', req.session.hash);
              next();
            });
          });
        });
      }
    });
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
          // console.log(res.cookies.sh);
          next();
        });
    });
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
// models.Sessions.create()
//   .then((session) => {
//     console.log('session created');
//     return session.insertId;
//   })
//   .then((sessionId) => {
//     models.Sessions.get({ id: sessionId })
//       .then((sessionRow) => {
//         req.session = {
//           id: sessionRow.id,
//           hash: sessionRow.hash,
//           userId: sessionRow.userId
//         };
//       })
//       .then(() => {
//         res.cookie('shortlyid', req.session.hash);
//       })
//       .then(() => {
//         next();
//       });
//   })
//   .catch((err) => {
//     throw err;
//   });
