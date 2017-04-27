/*
Name:
	Database Service

Description:
	Get information from db

Author:
	Saz
*/
angular.module('DatabaseService', []).factory('databaseServiceFactory', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/item');
        },

        getOne : function(itemNumber) {
            return $http.get('/api/item/' + itemNumber);
        },

        addNewItem : function(item) {
            return $http.put('/api/item/subtract/:item', item);
        },

        subtractFromItem : function(item) {
            return $http.put('/api/item/subtract/:item', item);
        },

    		remove : function(itemNumber) {
    		    return $http.delete('/api/item/' + itemNumber);
        },

        edit : function(newItem) {
            return $http.put('/api/item/:itemNumber', newItem);
        }
    }
}]);
