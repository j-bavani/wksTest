Meteor.publish('OrderList', function () {
  return [
    OrdersCollection.find()
  ];
}); 