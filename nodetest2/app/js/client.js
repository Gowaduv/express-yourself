 'use strict';

require('angular/angular');
require('angular-route');

var userApp = angular.module('userApp', ['ngRoute']);

//services
require('./services/resourceServices.js')(userApp);
//controllers
require('./users/controllers/usersController.js')(userApp);
//directives
require('./users/directives/newUserDirective.js')(userApp);


//Dependency Injection:
module.exports = function(app) {
	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.
    when('/demographics', {
			templateUrl: '/templates/directives/new-users-template.html',
			controller: 'usersController'
		}).
		otherwise({
			redirectTo: '/'
		});
	}]);
}
