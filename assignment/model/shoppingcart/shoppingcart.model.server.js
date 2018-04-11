var mongoose = require("mongoose");
var shoppingcartSchema = require("./shoppingcartSchema.schema.server");
var shoppingcartModel = mongoose.model('shoppingcartModel', shoppingcartModel);
var userModel = require("../user/user.model.server");

shoppingcartModel.addToShoppingCart = addToShoppingCart;
shoppingcartModel.findShoppingCart = findShoppingCart;


function addToShoppingCart(cake, user) {
	return shoppingcartModel.findShoppingCart(user.id)
	.then(function(shoppingCart) {
		var addedItemIndex = -1;//check if the cake is added in the cart already

		if(shoppingCart && shoppingCart.length > 0){
			addedItemIndex = shoppingCart.findIndex(cake => {
				return cake.cakeId === cake.id;
			});
		}

		if(addedItemIndex > -1){
			shoppingCart[addedItemIndex].quantity = shoppingCart[addedItemIndex].quantity + 1;
		} else{
			cake.quantity = 1;
			shoppingCart.push(cake);
		}

		shoppingCart.save();
	})
}

function findShoppingCart(userId) {
	return shoppingcartModel.find({"user": userId});
}
