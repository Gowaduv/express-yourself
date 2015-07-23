 'use strict';

require('angular/angular');

var userApp = angular.module('userApp', []);

require('./services/resourceServices.js')(userApp);

require('./users/usersController.js')(userApp);

