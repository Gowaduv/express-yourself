'use strict';

module.exports = function(app) {
  var handleError = function(data) {
    console.log(data);
  };

  app.factory('resource', ['$http', function($http){
    return function(resourceName) {
      return {
        getAll: function(callback) {
          $http({
            method: 'GET',
            url: '/' + resourceName
          })
          .success(callback)
          .error(handleError);
        },
        submitForm: function(resource, callback) {
          $http({
            method: 'POST',
            url: '/' + resourceName,
            data: resource
          })
          .success(callback)
          .error(handleError);
        },
        update: function(id, data, callback) {
          $http({
            method: 'PUT',
            url: '/' + resourceName + '/' + id,
            data: data
          })
          .success(callback)
          .error(handleError);
        },
        destroy: function(id, callback) {
          $http({
            method: 'DELETE',
            url: '/' + resourceName + '/' + id,
            data: id
          })
          .success(callback)
          .error(handleError);
        }
      };
    };
  }]);
};
