define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('EarthModel', [function () {
      return {
        camera: void 0,
        scene: void 0,
        renderer: void 0,
        canvas: void 0,
        light: void 0,
        earth: void 0,
        clouds: void 0,
        stars: void 0,
        shapeEarthTween: void 0
      };
    }]);
});  //# sourceMappingURL=earth.js.map
