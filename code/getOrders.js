module.exports.function = function getOrders () {
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

  const getOrdersOptions = {
    format: 'json',
    cacheTime : 0,
    headers:{
      "x-jwt":token
    },
    query:{
      status:"Pending"
    }
  };

  const getOrdersResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/restaurants/1/orders", getOrdersOptions);
  
  // GetOrders.model.bxb actrion의 output에 맞게 data 가공.
  let resultArray = [];
  if(getOrdersResult.ok){
    getOrdersResult.orders.forEach(aOrder=>{
      let order={};
      order.orderId = aOrder.id;

      const [year, todayZ] = aOrder.createdAt.split("T");
      const [today,_] = todayZ.split(".");

      order.createdAt = year + " / " + today;

      order.total = aOrder.total;
      order.status = aOrder.status;
      order.customer = aOrder.customer.email;
      order.dishItems=[];
      aOrder.items.forEach(item=>{
        let dishItem = {};
        dishItem.dishName = item.dish.name;
        dishItem.dishOptions=[];
        item.dish.options.forEach(dishOption=>{
          dishItem.dishOptions.push(dishOption.name);
        })
        order.dishItems.push(dishItem);
      })
      resultArray.push(order);
    })
  }
  return resultArray;
}
