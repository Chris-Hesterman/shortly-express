const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    var cookies = JSON.parse(req.headers.cookie);
    req.cookies = cookies;
  } else {
    req.cookies = null;
  }
  return next();
};

module.exports = parseCookies;
