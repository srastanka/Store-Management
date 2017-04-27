angular.module('AddService', []).factory('addServiceFactory', ['$http', function($http) {
    return {
		// Post an item
        addNewItem : function (newItem) {
            return $http.post('/api/add/addNewItem/', newItem);
        }
    }
}]);
