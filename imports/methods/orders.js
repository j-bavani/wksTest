Meteor.methods({
    InsertOrder(name) {
        if(name){
        return OrdersCollection.insert({ name });
        }else{
            return ''
        }
    },
    Deleteorder(_id) {
        ProductsCollection.remove({ orderId: _id });
        OrdersCollection.remove({ _id });

    }
});