'use strict';

module.exports = function(app){
	app.directive('newUserDirective', function(){
		return {
			restrict: 'ACME',
			templateUrl: '/templates/directives/new-users-template.html',
			replace: true
		}
	});
};
