'use strict';

require('angular/angular');

var userApp = angular.module('userApp', []);

module.exports = function(app) {
  app.controller('userController', ['$scope', '$http', function($scope, $http) {
    var getAll = function(){
      $http.get('/users').success(function(response){
        console.log(response);
        $scope.settings = response;
      });
    };
    getAll();

    $scope.submitForm = function(user) {
      console.log(setting);
      $http.post('/users', setting).success(function(response) {
        getAll();
      });
    };

    $scope.destroy = function(id) {
      console.log(id);
      $http.delete('/users/' + id).success(function(response) {
        getAll();
      });
    }

    $scope.edit = function(user) {
      setting.editing = true;
      console.log(setting);
    };

  }]);
};
