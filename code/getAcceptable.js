module.exports.function = function getAcceptable () {

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

  const getAcceptableOptions = {
    format: 'json',
    cacheTime : 0,
    headers:{
      "x-jwt":token
    }
  };
  const getDishesResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/restaurants/1/dishes", getAcceptableOptions);
  const getStocksResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/restaurants/1/stocks", getAcceptableOptions);
  
    let resultArray = [];
    let dishArray = [];
    if(getDishesResult.ok){
      getDishesResult.dishes.forEach(adish=>
      {
        let dresult={};
          dresult.dishname = adish.name;
        adish.ingredients.forEach(ingred=>{
          dresult.name = ingred.stock.name;
          dresult.count = ingred.count;
        })

        dishArray.push(dresult)
      })
    }
    let stockArray = [];
    if(getStocksResult.ok){
      getStocksResult.stocks.forEach(astock=>
      {
        let sresult={};
        sresult.name = astock.name;
        sresult.count = astock.count;

        stockArray.push(sresult)
      })
    }
    let result = {};
    result.minimum = 999999;

    for (let i = 0; i < dishArray.length; i++)
    {
      for (let j = 0; j < stockArray.length; j++)
      {
        let minimums = {};
        if (dishArray[i].name == stockArray[j].name)
        {
          minimums.dishname = dishArray[i].dishname;
          minimums.name = stockArray[j].name;
          minimums.count = stockArray[j].count / dishArray[i].count // 재고 / 요리당 필요한 재료수
        }
        if (result.minimum > minimums.count)
        {
          result.minimum = parseInt(minimums.count);
          result.dishname = minimums.dishname;
          result.stockname = minimums.name;
          result.stockcount = stockArray[j].count;
        }
      }
    }
    resultArray.push(result);

  return resultArray;
}
