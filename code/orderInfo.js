// 안 쓰는 파일이야!!

module.exports.function = function orderInfo (getOrdersResults) {
  const console = require('console');

  console.log(getOrdersResults.orderResults[0]);

  return {
    orderId: getOrdersResults.orderResults[0].orderId,
    createdAt: getOrdersResults.orderResults[0].createdAt,
    total: getOrdersResults.orderResults[0].total,
    status: getOrdersResults.orderResults[0].status,
    customer: getOrdersResults.orderResults[0].customer,
    dishitems: getOrdersResults.orderResults[0].dishitems,
  }
}
