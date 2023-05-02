requirejs.config({
  waitSeconds: 200,
  urlArgs: 'bust=' + new Date().getTime(),
  paths: {
    'jquery': '../lib/jquery-1.9.1',
    'bootstrap': '../lib/bootstrap',
    'angular': '../lib/angular',
    'angular_resource': '../lib/angular-resource',
    'browserdetect': '../lib/browserdetect',
    'flash_detect': '../lib/flash_detect',
    'csv2json': '../lib/csvjson',
    'canvg': '../lib/canvas/canvg',
    'rgbcolor': '../lib/canvas/rgbcolor',
    'stackblur': '../lib/canvas/stackblur',
    'threejs': '../lib/threejs/three',
    'stats': '../lib/threejs/stats.min',
    'trackballctrl': '../lib/threejs/trackballcontrol',
    'sound': '../lib/soundmanager2',
    'tweenjs': '../lib/tween'
  },
  shim: {
    'angular': {
      deps: [
        'jquery',
        'canvg',
        'rgbcolor',
        'stackblur',
        'sound'
      ],
      exports: 'angular'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    'angular_resource': {
      deps: ['angular'],
      exports: 'angular_resource'
    },
    'trackballctrl': {
      deps: ['threejs'],
      exports: 'trackballctrl'
    }
  }
});
define([
  'tweenjs',
  'jquery',
  'canvg',
  'rgbcolor',
  'stackblur',
  'angular',
  'csv2json',
  'appmodule',
  'threejs',
  'trackballctrl',
  'stats',
  'sound',
  'flash_detect',
  'browserdetect',
  'event',
  'control/earth',
  'control/mainscreen',
  'control/navigationpanel',
  'control/timelinepanel',
  'control/categorypanel',
  'control/mapareapanel',
  'control/maximizedpanel',
  'control/showingpanels',
  'control/dynastymap',
  'control/showingtextpanel',
  'control/showingimagepanel',
  'control/showingvideopanel',
  'control/dynastyintroaudio',
  'control/loginscreen',
  'service/csv',
  'service/preloaddata',
  'model/systemparameters',
  'model/resource',
  'model/earth'
], function () {
  var appModule;
  appModule = angular.module('app');
  return angular.element(document).ready(function () {
    var browserSupported;
    browserSupported = !(BrowserDetect.browser === 'Explorer' && BrowserDetect.version < 9);
    if (browserSupported) {
      return angular.bootstrap(document, ['app']);
    } else {
      return alert('You are using a browser that this course doesn\'t support, for the best experience please upgrade to Google Chrome 22, Mozilla Firefox 17, Safari 5.1, Internet Explorer 9, or later.');
    }
  });
});  //# sourceMappingURL=main.js.map
