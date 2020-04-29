const parseCookies = (req, res, next) => {
  console.log(req.headers);
  // if (req.headers.cookie === 'undefined') {
  //   console.log('there is a cookie!');
  //   var cookies = JSON.parse(req.headers.cookie);
  //   console.log(req.headers.cookie);
  //   req.cookies = cookies;
  // } else {
  //   console.log('there is no cookie!');
  //   req.cookies = null;
  // }
  return next();
};

module.exports = parseCookies;
