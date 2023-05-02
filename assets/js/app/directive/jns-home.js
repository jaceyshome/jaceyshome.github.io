define([
  'angular',
  'appmodule',
  'jquery'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.directive('jnsHome', function () {
    return function ($scope, $element, $attrs) {
      var animateStart, checkAllHomePages, cloudIn, cloudReset, fontImageIn, loadImage, loadingEle, seaBgIn, seaIn, sunIn, sunReset, titleIn;
      loadingEle = $($element).find($('.percentage'));
      loadImage = function (imageId, percentage) {
        var img;
        img = $(imageId)[0];
        return img.onload = function () {
          if (this.complete) {
            $scope.loadingFrontPageProcess += percentage;
            loadingEle.html('Loading...');
            loadingEle.css({ 'display': 'block' });
            return checkAllHomePages();
          }
        };
      };
      checkAllHomePages = function () {
        console.log($scope.loadingFrontPageProcess);
        if ($scope.loadingFrontPageProcess >= 100) {
          animateStart();
          return loadingEle.css({ 'display': 'none' });
        }
      };
      animateStart = function () {
        return titleIn();
      };
      titleIn = function () {
        return $('.title').fadeIn('slow', function () {
          return fontImageIn();
        });
      };
      fontImageIn = function () {
        return $('.frontImage').animate({ top: '50px' }, 'slow', seaIn);
      };
      seaIn = function () {
        return $('.seaImage').fadeIn('slow', seaBgIn);
      };
      seaBgIn = function () {
        return $('.seaBgImage').fadeIn('fast', function () {
          cloudReset('.cloud1', 64000);
          cloudReset('.cloud2', 54000);
          cloudReset('.cloud3', 34000);
          return sunReset();
        });
      };
      cloudReset = function (element, duration) {
        var top, topMax, topMin;
        topMax = 330;
        topMin = 30;
        top = Math.floor(Math.random() * topMax + topMin).toString() + 'px';
        $(element).css({
          'top': top,
          'left': '-200px'
        });
        return cloudIn(element, duration);
      };
      cloudIn = function (element, duration) {
        return $(element).animate({ left: '1200px' }, duration, function () {
          return cloudReset(element, duration);
        });
      };
      sunReset = function () {
        var duration, left, top;
        duration = 100000;
        top = '150px';
        left = '-200px';
        $('.sun').css({
          'top': top,
          'left': left
        });
        return sunIn(duration);
      };
      sunIn = function (duration) {
        return $('.sun').animate({
          left: '1300px',
          top: '-50px'
        }, duration, sunReset);
      };
      if ($scope.loadingFrontPageProcess >= 100) {
        animateStart();
        loadingEle.css({ 'display': 'none' });
      } else {
        loadingEle.css({ 'display': 'block' });
        $scope.loadingFrontPageProcess = 0;
        loadImage('.seaBgImage', 15);
        loadImage('.seaImage', 15);
        loadImage('.cloud1', 10);
        loadImage('.cloud2', 12);
        loadImage('.sun', 13);
        loadImage('.cloud3', 15);
        loadImage('.frontImage', 20);
      }
      return false;
    };
  });
});  //# sourceMappingURL=jns-home.js.map
