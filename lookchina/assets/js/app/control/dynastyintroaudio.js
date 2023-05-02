define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('DynastyIntroAudioControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    function (EVENT, SystemParameters, ResourceModel) {
      return {
        load: function ($scope) {
          var currentDynasty;
          currentDynasty = ResourceModel.currentDynasty;
          if (!currentDynasty) {
            return;
          }
          if (!currentDynasty.introduction || currentDynasty.introduction === '') {
            return;
          }
          return $scope.$emit(EVENT.PLAY_DYNASTY_INTRO_AUDIO, currentDynasty.introAudios[0]);
        },
        fadeInText: function () {
          var endY, introTextFadeInt, _ref;
          if (((_ref = ResourceModel.currentIntroAudio) != null ? _ref.audioId : void 0) == null) {
            return;
          }
          ResourceModel.drawingIntroText = {
            audioId: ResourceModel.currentIntroAudio.audioId,
            text: ResourceModel.currentIntroAudio.text,
            x: SystemParameters.dynastyIntroText.x,
            y: SystemParameters.dynastyIntroText.startY,
            fontWeight: SystemParameters.dynastyIntroText.fontWeight,
            fontFamily: SystemParameters.dynastyIntroText.fontFamily,
            fontSize: SystemParameters.dynastyIntroText.fontSize,
            color: SystemParameters.dynastyIntroText.color,
            textAlign: SystemParameters.dynastyIntroText.textAlign,
            width: SystemParameters.dynastyIntroText.width,
            alpha: 0,
            shadow: SystemParameters.dynastyIntroText.shadow
          };
          endY = SystemParameters.dynastyIntroText.endY;
          return introTextFadeInt = new TWEEN.Tween(ResourceModel.drawingIntroText).to({
            y: endY,
            alpha: 1
          }, 500).delay(10).easing(TWEEN.Easing.Quadratic.InOut).onComplete(function () {
          }).start();
        },
        draw: function ($scope) {
          var _ref;
          if (((_ref = ResourceModel.drawingIntroText) != null ? _ref.audioId : void 0) == null) {
            return;
          }
          return $scope.drawText(ResourceModel.drawingIntroText);
        }
      };
    }
  ]);
});  //# sourceMappingURL=dynastyintroaudio.js.map
