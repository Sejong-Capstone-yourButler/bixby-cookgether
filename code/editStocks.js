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
    headers:{
      "x-jwt":token
    }
  };

  const getStocksResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks", getStocksOptions);
  console.log(getStocksResult);
  
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
  console.log("stock.count", stock.count, "count", count);
  if (edit == "추가") {
    stock.count += count;
  }

  else if (edit == "제거") {
    stock.count -= count;
  }

  else if (edit == "변경") {
    stock.count = count;
  }
  console.log(stock);
  
  const editStockUrl = "https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks/" + stockId;
  const editStocksOptions = {
    format: 'json',
    passAsJson:true,
    headers:{
      "x-jwt":token
    }
  };
  const changeStocksResult = http.postUrl(editStockUrl, stock, editStocksOptions);
  console.log(changeStocksResult);

  getStocksResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks", getStocksOptions);
  console.log(getStocksResult);

  return stock;
}
