(function () {
//allow error message to be prompt in console - prevent mistake
'use strict';

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
  buy.items = ShoppingListCheckOffService.getAllBuyItem();

  //declare ng-click function
  $scope.click = function(index){

    //create an empty array for item adding purpose
    var addItem = [];

    //Get the specific item
    addItem.items = ShoppingListCheckOffService.getBuyItems(index);

    //Add the item into bough list
    ShoppingListCheckOffService.addBoughtItem(addItem.items);

    //Remove item from to buy list
    ShoppingListCheckOffService.removeBuyItems(index);

    //Display the message when the to buy list is clared
    if(buy.items.length == 0){
      buy.message = "Everything is Bought!"
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
  
  //Display message only when the bought list is empty
  bought.show = function(){
    if(bought.items.length > 0){
      return false;
    }else{
      return bought.message = "Nothing bought yet.";
    }
  }
}

//Service
function ShoppingListCheckOffService(){
  //Refernce back to the service
  var service = this;

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

  //get all to buy items1
  service.getAllBuyItem = function(){
    return toBuyList;
  };

  //get to buy item by index
  service.getBuyItems = function (index) {
    return toBuyList[index];
  };
}

})();
