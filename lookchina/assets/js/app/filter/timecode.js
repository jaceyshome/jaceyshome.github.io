define([
  'angular',
  'appmodule'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.filter('timecode', [function () {
      var filter;
      return filter = function (milliseconds) {
        var duration, hr, min, sec;
        if (milliseconds == null) {
          milliseconds = 0;
        }
        duration = moment.duration(milliseconds);
        hr = duration.hours().toString();
        if (hr.length === 1) {
          hr = '0' + hr;
        }
        min = duration.minutes().toString();
        if (min.length === 1) {
          min = '0' + min;
        }
        sec = duration.seconds().toString();
        if (sec.length === 1) {
          sec = '0' + sec;
        }
        return hr + ':' + min + ':' + sec;
      };
    }]);
});  //# sourceMappingURL=timecode.js.map
