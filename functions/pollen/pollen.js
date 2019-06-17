const getData = require('./lib/getData');
const reduceData = require('./lib/reduceData');
const getCookies = require('./lib/getCookies');

exports.handler = async function(event, context) {
  const cookies = getCookies(event.headers.cookie);

  try {
    const { sessionId, ...data } = await getData(cookies.sessionId);
    const result = reduceData(data);

    const response = {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (cookies.sessionId !== sessionId) {
      response.headers['Set-Cookie'] = `sessionId=${sessionId}`;
    }

    return response;
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
