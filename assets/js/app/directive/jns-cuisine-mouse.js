define([
  'angular',
  'appmodule',
  'jquery'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.directive('jnsCuisineMouse', function () {
    return function ($scope, element, attrs) {
      var color, colors;
      colors = Array();
      colors[0] = '#22f07e';
      colors[1] = '#f03f2c';
      colors[2] = '#f0ee32';
      colors[3] = '#f07a1b';
      colors[4] = '#22f07e';
      colors[5] = '#3cccf0';
      colors[6] = '#f06bb0';
      color = colors[Math.floor(Math.random() * 6 + 0)];
      $(element).mouseover(function () {
        return $(element).css({ 'background-color': color });
      });
      return $(element).mouseout(function () {
        return $(element).css({ 'background-color': '#ffffff' });
      });
    };
  });
});  //# sourceMappingURL=jns-cuisine-mouse.js.map
