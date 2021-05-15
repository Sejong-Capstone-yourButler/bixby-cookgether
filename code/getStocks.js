module.exports.function = function getStocks (name) {
  const console = require('console');
  const http = require('http');

  const loginOptions = {
    format: 'json',
    passasjson:true
  };

  const loginParams = {
    "email": "owner@gmail.com",
    "password": "12345"
  };

  const loginResult = http.postUrl("https://bixby-eats-backend.herokuapp.com/login", loginParams ,loginOptions);
  const token = loginResult.token;

  const getStocksOptions = {
    format: 'json',
    headers:{
      "x-jwt":token
    }
  };

  const getStocksResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks", getStocksOptions);
  console.log(getStocksResult);
  
  let resultArray = [];
  if(getStocksResult.ok){
    getStocksResult.stocks.forEach(aStock=>
    {
      let stock={};
      if (name == null)
      {
        stock.name = aStock.name;
        stock.count = aStock.count;
      }
      else if (aStock.name == name)
      {
        stock.name = aStock.name;
        stock.count = aStock.count;
      }
      resultArray.push(stock);
    })
  }

  console.log(resultArray);

  return resultArray;
    // ok: result.ok,
    // stockId: resultaArray.stock.stockId,
    // createdAt: resultaArray.stock.stockId,
    // total: resultaArray.stock.stockId,
    // status: resultaArray.stock.stockId,
    // customer: resultaArray.stock.stockId,
    // dishitems: resultaArray.stock.stockId,
  
}
