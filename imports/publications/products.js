Meteor.publish('ProductsListPublish', function () {
    return [
        ProductsCollection.find({})
    ];
});