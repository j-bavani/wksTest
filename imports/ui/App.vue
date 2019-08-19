<template>
  <div class="container">
    <div class="row m-5">
      <!-- Left column - Forms -->
      <div class="col-6">
        <div class="border p-3">
          <div class="alert alert-success" role="alert" v-if="msg">{{msg}}</div>
          <form @submit.prevent="onSubmit">
            <!--  First step -->
            <!-- Order Name -->
            <div class="form-group" v-if="!orderId">
              <label for="orderName">Name:</label>
              <input
                type="text"
                class="form-control"
                id="orderName"
                placeholder="der Name der Bestellung"
                v-model="orderName"
                required
              />

            </div>
            <!-- Second  step -->
            <!-- Order number -->
            <div v-else>
              <div class="form-group">
                <label for="orderid">BestellungNumer :</label>
                <input
                  type="text"
                  class="form-control"
                  id="orderid"
                  placeholder="BestellungNumer"
                  v-model="orderId"
                  readonly
                />

              </div>
              <!-- Product From -->
              <div class="mb-3">
                <div class="form-group" v-for="(product,index) in myProducts" :key="index">
                  <label for="product">Produkt {{index+1}}:</label>
                  <!-- Delete product from -->
                  <button
                    type="button"
                    class="close float-right"
                    aria-label="Close"
                    @click="deleteProductForm(index)"
                  >
                  
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <!-- Product name -->
                  <input
                    type="text"
                    class="form-control"
                    id="product"
                    placeholder="der Name des Prudukt"
                    v-model="product.name"
                  />
                </div>
                <!-- Add button -->
                <button type="button" class="btn btn-success" @click="addNewProductForm">
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
            <!-- Submit button -->
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <!-- Right column - Reports -->
      <div class="col-6">
        <div class="border p-3 row">
          <div class="col-6">
            <!-- Order list -->
            <ul>
              <li v-for="(order,index) in currentOrderList" :key="index">
                <span>{{order.name}}</span>
                <!-- Info button -->
                <button class="btn btn-sm" @click="showOrderDetails(order._id)">
                  <i class="fa fa-info"></i>
                </button>
                <!-- Delete button -->
                <button class="btn btn-sm" @click="deleteOrder(order._id)">
                  <i class="fa fa-trash-alt"></i>
                </button>
              </li>
            </ul>
          </div>
          <div class="col-6">
            <!-- Product list -->
            <ul v-if="productList">
              <li v-for="(product,index) in productList" :key="index">{{product.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../collections/orders";
import "../collections/products";
export default {
  data() {
    return {
      orderName: "",
      orderId: "",
      myProducts: [
        {
          name: ""
        }
      ],
      orderList: "",
      productList: "",
      msg: ""
    };
  },
  methods: {
    /**
     * Add a Product From
     */
    addNewProductForm(evt) {
      evt.preventDefault();
      this.myProducts.push({
        name: ""
      });
    },

    /**
     * Remove a Product From
     */

    deleteProductForm(index) {
      this.myProducts.splice(index, 1);
    },

    /**
     * Submit the order Form
     */

    onSubmit(evt) {
      // evt.preventDefault();
      if (this.orderId) {
        // Insert products
        Meteor.call(
          "InsertProducts",
          this.myProducts,
          this.orderId,
          (err, res) => {
            this.orderId = "";
            this.msg = "Success";
            this.orderName = "";
            this.myProducts = [{ name: "" }];
          }
        );
        
      } else {
        // Insert order
        Meteor.call("InsertOrder", this.orderName, (err, res) => {
          if (res) {
            this.orderId = res;
            this.msg = "";
          }
        });
      }
    },
    /**
     * Show order details (products list)
     */

    showOrderDetails(orderId) {
      this.productList = ProductsCollection.find({ orderId });
    },
    /**
     * Delete an order with its products
     */

    deleteOrder(orderId) {
      Meteor.call("Deleteorder", orderId);
    }
  },

  meteor: {
    $subscribe: {
      OrderList: [],
      ProductsListPublish: []
    },
    /**
     * Order list 
     */
    currentOrderList() {
      return OrdersCollection.find({});
    }
  }
};
</script>