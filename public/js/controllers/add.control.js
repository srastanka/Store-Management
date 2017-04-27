/*
Name:
	add.control

Description:
	Controller for add view

Author:
	Saz
*/

angular.module('AddCtrl', []).controller('AddController', function($scope, $window, databaseServiceFactory, addServiceFactory) {
    var vm = this;
    vm.title = "Add items";
	vm.actionResponse = ""
	vm.responseStyle = {}
    vm.searchInput = '';
	vm.order = {key: 'itemNumber',reverse: false};
	vm.marginStyle = {};

	vm.queryForItem = function () {
		databaseServiceFactory.get().then(function(result) {
			vm.items = result.data;
		});
	}

	vm.queryForItem ();

	vm.addItem = function () {
		if (vm.validateMainInputs()) {
			// Check if already exists
			databaseServiceFactory.getOne($scope.newItemNumber).then(function(result) {
				if (result.data != null) {
					console.log(result.data);
					//  The item exists already.  Alert the user.
					vm.displayResponse ("Item number \"" + $scope.newItemNumber + "\" already exists", "red");
				} else {
					var newItem = {itemNumber: $scope.newItemNumber,
								   desc: $scope.newDescription,
								   quantity: $scope.newQuantity,
                   cost: $scope.newCost}

					vm.insertItem (newItem);
				}
			});
		}
	}

	vm.validateMainInputs = function () {
		if (typeof($scope.newItemNumber) == "undefined") {
			vm.displayResponse ("Item number field is invalid", "red");
			return false;
		} else if (typeof($scope.newDescription) == "undefined") {
			vm.displayResponse ("Description field is invalid", "red");
			return false;
		} else if ((typeof($scope.newQuantity) == "undefined") || isNaN($scope.newQuantity) || $scope.newQuantity < 0) {
			vm.displayResponse ("Quantity field is invalid", "red");
			return false;
		} else if ((typeof($scope.newCost) == "undefined") || isNaN($scope.newCost) || $scope.newCost < 0) {
			vm.displayResponse ("Cost field is invalid", "red");
			return false;
		} else {
			vm.displayResponse ("", "");
			return true;
		}
	}

	vm.insertItem = function (newItem) {
			addServiceFactory.addNewItem(newItem).then(function(result) {
				vm.displayResponse ("Item " + $scope.newItemNumber + " added", "green");
				vm.clearFields();
				vm.queryForItem ();
			});
	}

	vm.clearFields = function () {
		$scope.newItemNumber = undefined;
		$scope.newDescription = undefined;
		$scope.newQuantity = undefined;
		$scope.newCost = undefined;
	}
	vm.displayResponse = function (message, color) {
		vm.responseStyle = {"color" : color}
		vm.actionResponse = message;
	}
});
