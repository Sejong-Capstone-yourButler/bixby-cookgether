module.exports.function = function getOrders () {
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

  const getOrdersOptions = {
    format: 'json',
    headers:{
      "x-jwt":token
    }
  };

  const getOrdersResult = http.getUrl("https://bixby-eats-backend.herokuapp.com/orders", getOrdersOptions);
  console.log(getOrdersResult);
  
  let resultArray = [];
  if(getOrdersResult.ok){
    getOrdersResult.orders.forEach(aOrder=>{
      let order={};
      order.orderId = aOrder.id;
      order.createdAt = aOrder.createdAt;
      order.total = aOrder.total;
      order.status = aOrder.status;
      order.customer = aOrder.customer.email;
      order.dishItems=[];
      aOrder.items.forEach(item=>{
        let dishItem = {};
        dishItem.name = item.dish.name;
        dishItem.options = item.dish.options;
        order.dishItems.push(dishItem);
      })
      resultArray.push(order);
    })
  }  

  return resultArray;
    // ok: result.ok,
    // orderId: resultaArray.order.orderId,
    // createdAt: resultaArray.order.orderId,
    // total: resultaArray.order.orderId,
    // status: resultaArray.order.orderId,
    // customer: resultaArray.order.orderId,
    // dishitems: resultaArray.order.orderId,
  
}
