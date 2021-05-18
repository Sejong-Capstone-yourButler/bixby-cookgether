// 현재 사용하지 않는 파일\
// 로그인 input view 만들 때 쓸 예정

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
