const parseCookies = (req, res, next) => {
  if (!req.headers.cookie) {
    req.cookies = {};
  } else {
    var cookie = req.headers.cookie;
    var cookiesArray = cookie.split('; ');

    var cookieObj = cookiesArray.reduce((acc, cookie, index, array) => {
      var cookieArr = cookie.split('=');
      acc[cookieArr[0]] = cookieArr[1];
      return acc;
    }, {});

    req.cookies = cookieObj;
  }
  next();
};

/*
{
  cookiename: value
}
*/

module.exports = parseCookies;
