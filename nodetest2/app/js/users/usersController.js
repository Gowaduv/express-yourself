'use strict';

module.exports = function(app) {
  app.controller('userController', ['$scope', '$http', function($scope, $http) {

    var getAll = function(){
      $http.get('/users').success(function(response){
        console.log(response);
        $scope.users = response;
      });
    };

    getAll();

    $scope.submitForm = function(user) {
      console.log(user);
      $http.post('/users', user).success(function(response) {
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
      user.editing = true;
      console.log(user);
    };

    $scope.cancel = function(user) {
      getAll();
    };

    $scope.update = function(user) {
      console.log(user);
      $http.put('/users/' + user._id, user)
        .error(function (error) {
          console.log(error);
          $scope.errors.push({msg: 'could not update book'});
        });
      user.editing = false;
      getAll();
    };

  }]);
};

