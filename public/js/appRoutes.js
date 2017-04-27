/*
Name:
	appRoutes

Description:
	Routes to
		- Home
		- Query
		- Add

Author:
	Saz
*/

angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    	//  Home view
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        //  Query view
        .when('/query', {
            templateUrl: 'views/query.html',
            controller: 'QueryController'
        })

        //  Add view
        .when('/add', {
            templateUrl: 'views/add.html',
            controller: 'AddController'
        })

        //  Redirect incorrect navigation to the default (Home) view
		.otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
}]);
