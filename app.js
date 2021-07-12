(function () {
//allow error message to be prompt in console - prevent mistake
'use strict';

//5 items shopping list declared as an array (to buy)
var toBuyList = [
  {
    name: "Milk",
    quantity: "5"
  },
  {
    name: "Soft Drink",
    quantity: "10"
  },
  {
    name: "Cookies",
    quantity: "50"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Chips",
    quantity: "20"
  }
];

//List of bought items as an array (bought)
var boughtList = [];

//Set the maximum items
var max =

//bound to html file
angular.module('ShoppingListCheckOff', [])

//control the view
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

//Inject for ToBuyController
ToBuyController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function ToBuyController($scope, ShoppingListCheckOffService){

  //Refernce back to the function
  var buy = this;

  //assign the to buy shopping list with the global variable
  buy.items = toBuyList;

  $scope.click = function(index){

    var addItem = [];
    //Get the specific item
    addItem.items = ShoppingListCheckOffService.getBuyItems(index);

    //Add the item into bough list
    ShoppingListCheckOffService.addBoughtItem(addItem.items);

    //Remove item from to buy list
    ShoppingListCheckOffService.removeBuyItems(index);

    if(buy.items.length == 0){
      buy.errorMessage = "Everything is Bought!"
    }
  };

}

//Inject for AlreadyBoughtController
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){

  //Refernce back to the function
  var bought = this;

  //assign the to buy shopping list with the global variable
  bought.items = ShoppingListCheckOffService.getBoughtItems();
console.log(maxItems);
  if(bought.items.length == max-1){

  }

}

//Service
function ShoppingListCheckOffService(){
  //Refernce back to the service
  var service = this;

  //Add item into bought list
  service.addBoughtItem = function(item){
    try{
        //Push the item into the array
        boughtList.push(item);
    }catch(error){
      boughtList.errorMessage = error.message;
    }
  };

  //Remove item from to buy list using index
  service.removeBuyItems = function (itemIndex) {
    try{
      toBuyList.splice(itemIndex, 1);
    }catch(error){
      toBuyList.errorMessage = error.message;
    }
  };

  //Get bought items
  service.getBoughtItems = function(){
    return boughtList;
  };

  //get to buy item by index
  service.getBuyItems = function (index) {
    return toBuyList[index];
  };
}


})();
