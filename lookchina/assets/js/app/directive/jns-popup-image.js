define([
  'angular',
  'appmodule',
  'jquery'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.directive('jnsPopupImage', function () {
    ({ restrict: 'A' });
    return function ($scope, $element, $attrs) {
      var imageUrl, showCurrentImage;
      imageUrl = $attrs.jnsPopupImage;
      $element.click(function () {
        return showCurrentImage(imageUrl);
      });
      return showCurrentImage = function (imageUrl) {
        var img;
        if ($scope.currentImage === imageUrl) {
          $('.popupImage').fadeIn();
          return;
        }
        $scope.currentImage = imageUrl;
        img = $('.popupImage').find($('img'))[0];
        img.onload = function () {
          var offset;
          if (this.complete) {
            $('.popupImage').fadeIn();
            offset = (this.clientHeight + 6).toString() + 'px';
            return $('.popupImage').find($('a')).css({ 'bottom': offset });
          }
        };
        return img.src = imageUrl;
      };
    };
  });
});  //# sourceMappingURL=jns-popup-image.js.map
