const fetch = require('node-fetch');

async function fetchWithSessionId(sessionId) {
  const response = await fetch(
    `https://www.pollental.dk/home?p_p_id=pollenbox_WAR_pollenportlet&p_p_lifecycle=2&station=48&s=${sessionId}`,
    {
      headers: {
        Accept: "application/json",
        Cookie: `COOKIE_SUPPORT=true; GUEST_LANGUAGE_ID=da_DK; JSESSIONID=${sessionId}`
      }
    }
  );

  return response.json();
}

/**
 * @param {string} sessionId
 *
 * @returns {Promise<{
 *   sessionId: string
 *   date: string,
 *   feed: Object<string, {
 *     level: Number,
 *     levelDescription: string,
 *     inSeason: Boolean
 *   }>}
 * >}
 */
async function getData(sessionId = '') {
  if (sessionId) {
    try {
      return {
        sessionId,
        ...(await fetchWithSessionId(sessionId))
      };
    } catch(err) {}
  }

  let jsonPromise;
  const response = await fetch(
    "https://www.pollental.dk/home?p_p_id=pollenbox_WAR_pollenportlet&p_p_lifecycle=2",
    {
      headers: { Accept: "application/json" }
    }
  );

  /** @type {String} */
  const cookies = response.headers.get("set-cookie");

  if (cookies.startsWith("JSESSIONID=")) {
    sessionId = cookies.match(/^JSESSIONID=([^;]+);/)[1];

    jsonPromise = fetchWithSessionId(sessionId);
  } else {
    jsonPromise = response.body.json();
  }

  const json = await jsonPromise;

  return {
    sessionId,
    ...json
  };
}

module.exports = getData;
