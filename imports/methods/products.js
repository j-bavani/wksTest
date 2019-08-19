Meteor.methods({
    InsertProducts(products, orderId) {
        products.map(function (product) {
            if(product.name)
            ProductsCollection.insert({name : product.name, orderId });
        })

    },
    UdateProduct(_id, val) {
        return ProductsCollection.update({ _id }, val)
    },
    DeleteProduct(_id) {
        return ProductsCollection.remove({ _id });
    },
});