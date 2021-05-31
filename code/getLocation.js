module.exports.function = function getLocation (orderNum) {
  let location = {};
  location.weburi = "https://suspicious-brown-c47e44.netlify.app/orders/" + orderNum;
  return location;
}
