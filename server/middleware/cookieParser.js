const parseCookies = (req, res, next) => {
  var cookies = JSON.parse(req.headers.cookie);
  req.cookies = cookies;
  return next();
};

module.exports = parseCookies;
