/*
Name:
	Query Service

Description:
	Provides a service for the Query functionality.

Author:
	Saz
*/


angular.module('QueryService', []).factory('queryServiceFactory', ['$http', function($http) {
    return {
		edit : function(newItem) {
            return $http.put('/api/query/addQuantity/:itemNumber', newItem);
        }
    }
}]);
