module.exports.function = function editStocks (name, count, edit) {
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
    cacheTime : 0,
    headers:{
      "x-jwt":token
    }
  };

  const getStocksResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks", getStocksOptions);
  
  let stock={};
  let stockId;
  if(getStocksResult.ok){
    getStocksResult.stocks.forEach(aStock=>
    {
      if (aStock.name == name)
      {
        stock.name = aStock.name;
        stock.count = parseInt(aStock.count);
        stockId = aStock.id;
      }
    })
  }
  if (edit == "추가") {
    stock.count += count;
  }

  else if (edit == "제거") {
    stock.count -= count;
  }

  else if (edit == "변경") {
    stock.count = count;
  }
  
  const editStockUrl = "https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks/" + stockId;
  const editStocksOptions = {
    format: 'json',
    passAsJson:true,
    cacheTime : 0,
    headers:{
      "x-jwt":token
    }
  };
  const changeStocksResult = http.postUrl(editStockUrl, stock, editStocksOptions);

  return stock;
}
