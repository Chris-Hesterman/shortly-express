const parseCookies = (req, res, next) => {
  if (!req.headers.cookies) {
    req.cookies = {};
  } else {
    var cookieKeys = Object.keys(req.headers.cookies);
  }
  next();
};

module.exports = parseCookies;
