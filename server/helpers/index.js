
const http_build_query = (jsonObj) => {
  const keys = Object.keys(jsonObj);
  const values = keys.map(key => jsonObj[key]);

  return keys
    .map((key, index) => {
      return `${key}=${values[index]}`;
    })
    .join("&");
};

module.exports = {
  http_build_query
}