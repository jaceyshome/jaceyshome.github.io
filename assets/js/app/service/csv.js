define([
  'angular',
  'appmodule',
  'angular_resource',
  'csv2json'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('CSV', [
    '$http',
    function ($http) {
      return {
        loadImageInfos: function (callback) {
          var url;
          url = 'assets/data/csv/images.csv';
          return $http.get(url, {
            transformResponse: function (data) {
              var json;
              json = csvjson.csv2json(data, {
                delim: ',',
                textdelim: '"'
              });
              return json;
            }
          }).success(function (data, status) {
            return callback(data.rows);
          });
        }
      };
    }
  ]);
});  //# sourceMappingURL=csv.js.map
