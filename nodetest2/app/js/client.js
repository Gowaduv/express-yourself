'use strict';

require('angular/angular');

var userApp = angular.module('userApp', []);

require("./users/usersController")(userApp);
