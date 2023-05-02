define([
  'angular',
  'angular_resource'
], function () {
  var module;
  module = angular.module('app', ['ngResource']);
  return module.config([
    '$routeProvider',
    '$locationProvider',
    function ($routeProvider, $locationProvider) {
      return $locationProvider.html5Mode(false);
    }
  ]);
});  //# sourceMappingURL=appmodule.js.map
