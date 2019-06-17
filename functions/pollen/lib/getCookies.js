/**
 * @param {string} cookieString
 * @returns {Object<string, string>}
 */
function getCookies(cookieString = '') {
  const cookies = {};

  for (const pair of cookieString.trim().split(';')) {
    const [key, value] = pair.trim().split('=');
    cookies[key] = value;
  }

  return cookies;
}

module.exports = getCookies;
