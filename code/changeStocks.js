module.exports.function = function changeStocks (stockname, stockcount, edit) {
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
  
  //let resultArray = []; // get stock
  let stock={};
  if(getStocksResult.ok){
    getStocksResult.stocks.forEach(aStock=>
    {
      if (aStock.name == stockname)
      {
        stock.stockname = aStock.name;
        stock.count = aStock.count;
        stock.stockid = aStock.id;
      }
    })
  }

  if (edit == "추가") {
    stock.count += stockcount;
  }

  else if (edit == "제거") {
    stock.count -= stockcount;
  }

  else if (edit == "수정") {
    stock.count = stockcount;
  }
  console.log(stock);
  
  const url = "https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks/" + stock.stockid;
  const changeStocksOptions = {
    format: 'json',
    headers:{
      "x-jwt":token
    }
  };
  const changeStocksResult = http.postUrl(url, stock, changeStocksOptions);
  console.log(changeStocksResult);

  return stock;
}
