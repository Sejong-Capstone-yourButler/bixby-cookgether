module.exports.function = function login (email,password) {
  const console = require('console');
  const http = require('http');

  const options = {
    format: 'json'
  };

  const params={
	"email":"wjdghdwns0@gmail.com",
	"password":"12345"
}

  const result = http.postUrl("http://localhost:4000/login", params ,options);
  console.log(result);

  // setTimeout

  return {
    ok: result.ok,
    token: result.token
  };
}
