const nameMap = {
  1: "el",
  2: "hassel",
  4: "elm",
  7: "birk",
  28: "Grass",
  44: "alternaria",
  45: "cladosporium"
};

function getLevel(levelIdx) {
  switch(levelIdx){
    case "1":
      return "low";
    case "2":
      return "moderate";
    case "3":
      return "high";
    default:
      return "no data";
  }
}

/**
 * @param {{
 *   date: String,
 *   feed: Object<string, {
 *     level: Number,
 *     levelDescription: String,
 *     inSeason: Boolean
 *   }>
 * }} data
 *
 * @returns {{
 *   date: string
 *   items: Array<{
 *     name: string
 *     level: number
 *     description: string
 *   }>
 * }}
 */
function reduceData(data) {
  const result = {
    date: new Date().toISOString(),
    items: []
  };

  for (const [key, value] of Object.entries(data.feed)) {
    if (value.inSeason) {
      const name = nameMap[key];

      result.items.push({
        name,
        level: value.level,
        description: getLevel(value.levelDescription)
      })
    }
  }

  return result;
}

module.exports = reduceData;
