module.exports.function = function getStocks (stockname) {
  const console = require('console');
  const http = require('http');

  const loginOptions = {
    format: 'json',
    passAsJson:true
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
      if (stockname == null) // 품목명이 입력되지 않았을 때 -> 전체 재고 조회
      {
        stock.stockname = aStock.name;
        stock.count = aStock.count;
      }
      else if (aStock.name == stockname)
      {
        stock.stockname = aStock.name;
        stock.count = aStock.count;
      }
      resultArray.push(stock);
    })
  }

  console.log(resultArray);

  return resultArray;
  
}
