/*
Name:
	query.control

Description:
	Controller for the Query view.

Angular Module Name:
	QueryCtrl

Controller Name:
	QueryController

Author:
	Saz
*/
angular.module('QueryCtrl', []).controller('QueryController', function($scope, queryServiceFactory, databaseServiceFactory) {
    var vm = this;
    vm.title = "Items available";
    vm.searchInput = '';
	vm.popupHandler = new PopupHandler ();

	vm.items = [];


	vm.queryForItem = function () {
		databaseServiceFactory.get().then(function(result) {
			vm.items = result.data;
		});
	}


	vm.openAddWindow = function (item) {
		vm.popupHandler.backgroundStyle = {'opacity': '0.4', 'filter': 'alpha(opacity=40)'};
		vm.popupHandler.openAddWindow();
		vm.popupHandler.editItem = item;
		$scope.popupItemNumber = item.itemNumber;
		$scope.popupDescription = item.desc;
		$scope.popupQuantity = 0;
		$scope.popupCost = undefined;
	}

	vm.openSubtractWindow = function (item) {
		vm.popupHandler.backgroundStyle = {'opacity': '0.4', 'filter': 'alpha(opacity=40)'};
		vm.popupHandler.openSubtractWindow();
		vm.popupHandler.editItem = item;
		$scope.popupItemNumber = item.itemNumber;
		$scope.popupDescription = item.desc;
		$scope.popupQuantity = 0;
		$scope.popupCost = undefined;
	}

	vm.openEditWindow = function (item) {
		vm.popupHandler.backgroundStyle = {'opacity': '0.4', 'filter': 'alpha(opacity=40)'};
		vm.popupHandler.openEditWindow();
		vm.popupHandler.editItem = item;
		$scope.popupItemNumber = item.itemNumber;
		$scope.popupDescription = item.desc;
		$scope.popupCost = item.cost;
	}

	vm.openRemoveWindow = function (item) {
		vm.popupHandler.backgroundStyle = {'opacity': '0.4', 'filter': 'alpha(opacity=40)'};
		vm.popupHandler.openRemoveWindow();
		vm.popupHandler.setResponse ("Remove Item?", "red");;
		vm.popupHandler.editItem = item;
		$scope.popupItemNumber = item.itemNumber;
		$scope.popupDescription = item.desc;
	}

	vm.removeItem = function () {
		databaseServiceFactory.remove(vm.popupHandler.editItem.itemNumber).then(function(result) {
			vm.popupHandler.closeAllWindows();
			vm.queryForItem();
			vm.displayResponse ("Removed " + $scope.popupItemNumber, "green");
		});;
	}

	vm.editItem = function () {
			//  Edit description and cost fields of the editing item.
			vm.popupHandler.editItem.desc = $scope.popupDescription;
			vm.popupHandler.editItem.cost = $scope.popupCost;

			addServiceFactory.edit(vm.popupHandler.editItem).then(function(result) {
				vm.popupHandler.closeAllWindows();
				vm.popupHandler.backgroundStyle = {};
				vm.queryForItem();
			});
	}

	vm.addItems = function () {
		//  Verify quantity input
		if ((typeof($scope.popupQuantity) == "undefined") || isNaN($scope.popupQuantity)) {
			vm.popupHandler.setResponse ("Invalid quantity number", "red");
		} else {
			var item = vm.popupHandler.editItem;
			item.quantity = Number($scope.popupQuantity);
		}
	}

	vm.subtractItems = function () {
		//  Verify quantity input
		if ((typeof($scope.popupQuantity) == "undefined") || isNaN($scope.popupQuantity)) {
			vm.popupHandler.setResponse ("Invalid quantity number", "red");
		} else if ($scope.popupQuantity > vm.popupHandler.editItem.quantity) {
			vm.popupHandler.setResponse ("Cannot remove more quantity than there is", "red");
		} else {
			var removeItem = {itemNumber: vm.popupHandler.editItem.itemNumber,
							  subtract: $scope.popupQuantity};
			//  Subtract quantity
			databaseServiceFactory.subtractFromItem(removeItem).then(function(result) {
				vm.displayResponse(removeItem.subtract + " quantity removed from " + removeItem.itemNumber, "green");
				vm.popupHandler.closeAllWindows();
				vm.queryForItem();
			});
		}
	}

	vm.displayResponse = function (message, color) {
		vm.responseStyle = {"color" : color}
		vm.actionResponse = message;
	}

	vm.queryForItem();
});

function PopupHandler () {
	this.heading = "";
	this.windowShow = false;
	this.windowType = ""
	this.response = "";
	this.responseStyle = "";
	this.editItem = {};
	this.backgroundStyle = {};

	this.openAddWindow = function () {
		this.heading = "Add Items";
		this.windowShow = true;
		this.windowType = "add";
	};

	this.openSubtractWindow = function () {
		this.heading = "Subtract Items";
		this.windowShow = true;
		this.windowType = "subtract";
	};

	this.openEditWindow = function () {
		this.heading = "Edit an item";
		this.windowShow = true;
		this.windowType = "edit";
	};

	this.openRemoveWindow = function () {
		this.heading = "Remove item";
		this.windowShow = true;
		this.windowType = "remove";
	};

	this.closeAllWindows = function () {
		this.windowShow = false;
		this.windowType = "";
		this.setResponse ("", "");
		this.backgroundStyle = {};
	};

	this.setResponse = function (message, color ) {
		this.responseStyle = {"color" : color};
		this.response = message;
	}
}
