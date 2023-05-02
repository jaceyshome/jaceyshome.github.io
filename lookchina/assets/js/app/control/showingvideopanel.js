define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('ShowingVideoPanelControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    function (EVENT, SystemParameters, ResourceModel) {
      return {
        draw: function ($scope) {
          var canvas, ctx;
          canvas = $scope.canvas;
          ctx = $scope.context;
          if (!ctx) {
          }
        },
        createPanel: function ($scope, resource, position, container) {
          var newVideoPanel, panelSettings, panelX, panelY, videoId, videoPanelSetting;
          videoPanelSetting = SystemParameters.panelSettings.videoPanel;
          panelSettings = SystemParameters.panelSettings;
          panelX = position.x;
          panelY = position.y;
          videoId = 'videoResource' + resource.id;
          newVideoPanel = {
            visible: true,
            videoId: videoId,
            video: void 0,
            x: panelX + videoPanelSetting.padding,
            y: panelY + videoPanelSetting.padding,
            width: videoPanelSetting.maxWidth - videoPanelSetting.padding * 2,
            height: videoPanelSetting.maxHeight - videoPanelSetting.padding * 2,
            resource: resource,
            frame: {
              x: panelX,
              y: panelY,
              width: videoPanelSetting.maxWidth,
              height: videoPanelSetting.maxHeight,
              lineWidth: videoPanelSetting.frame.lineWidth,
              strokeColor: videoPanelSetting.frame.strokeColor,
              strokeAlpha: videoPanelSetting.frame.strokeAlpha,
              fillColor: videoPanelSetting.frame.fillColor,
              fillAlpha: videoPanelSetting.frame.fillAlpha,
              fill: videoPanelSetting.frame.fill
            },
            mask: {
              x: panelX + videoPanelSetting.padding,
              y: panelY + videoPanelSetting.padding,
              width: videoPanelSetting.maxWidth - videoPanelSetting.padding * 2,
              height: videoPanelSetting.maxHeight - videoPanelSetting.padding * 2
            },
            hitspot: {
              x: panelX,
              y: panelY,
              width: videoPanelSetting.maxWidth,
              height: videoPanelSetting.maxHeight
            },
            buttonClose: {
              data: $scope.getImageByName(panelSettings.buttonClose.buttonName).data,
              x: panelX + panelSettings.normalPanel.width - panelSettings.buttonClose.width,
              y: panelY,
              width: panelSettings.buttonClose.width,
              height: panelSettings.buttonClose.height,
              hitspot: {
                x: panelX + panelSettings.normalPanel.width - panelSettings.buttonClose.width,
                y: panelY,
                width: panelSettings.buttonClose.width,
                height: panelSettings.buttonClose.height
              },
              visible: true
            },
            buttonMaximize: {
              data: $scope.getImageByName(panelSettings.buttonMaximize.buttonName).data,
              x: panelX + panelSettings.normalPanel.width - panelSettings.buttonClose.width,
              y: panelY + panelSettings.buttonClose.height + panelSettings.buttonMargin,
              width: panelSettings.buttonMaximize.width,
              height: panelSettings.buttonMaximize.height,
              hitspot: {
                x: panelX + panelSettings.normalPanel.width - panelSettings.buttonClose.width,
                y: panelY + panelSettings.buttonClose.height + panelSettings.buttonMargin,
                width: panelSettings.buttonMaximize.width,
                height: panelSettings.buttonMaximize.height
              },
              visible: true
            },
            buttonPause: {
              data: $scope.getImageByName(panelSettings.buttonPause.buttonName).data,
              x: panelX + panelSettings.normalPanel.width - panelSettings.buttonPause.width,
              y: panelY + panelSettings.buttonPause.height * 2 + panelSettings.buttonMargin,
              width: panelSettings.buttonPause.width,
              height: panelSettings.buttonPause.height,
              hitspot: {
                x: panelX + panelSettings.normalPanel.width - panelSettings.buttonPause.width,
                y: panelY + panelSettings.buttonPause.height * 2 + panelSettings.buttonMargin,
                width: panelSettings.buttonPause.width,
                height: panelSettings.buttonPause.height
              },
              visible: true
            },
            buttonPlay: {
              data: $scope.getImageByName(panelSettings.buttonPlay.buttonName).data,
              x: panelX + panelSettings.normalPanel.width - panelSettings.buttonPlay.width,
              y: panelY + panelSettings.buttonPlay.height * 2 + panelSettings.buttonMargin,
              width: panelSettings.buttonPlay.width,
              height: panelSettings.buttonPlay.height,
              hitspot: {
                x: panelX + panelSettings.normalPanel.width - panelSettings.buttonPlay.width,
                y: panelY + panelSettings.buttonPlay.height * 2 + panelSettings.buttonMargin,
                width: panelSettings.buttonPlay.width,
                height: panelSettings.buttonPlay.height
              },
              visible: false
            }
          };
          container.panel = newVideoPanel;
          $scope.$emit(EVENT.ADD_SHOWING_PANEL, newVideoPanel);
          newVideoPanel.video = document.getElementById(videoId);
          if (newVideoPanel.video) {
            return newVideoPanel.video.play();
          }
        },
        handleMouseUp: function ($scope, e, showingPanel) {
          var data;
          if (!showingPanel) {
            return;
          }
          if ($scope.checkMouseAndHitspotCollision(e, showingPanel.buttonClose.hitspot)) {
            data = { panel: showingPanel };
            $scope.$emit(EVENT.REMOVE_SHOWING_PANEL, data);
          }
          if (showingPanel.buttonMaximize.visible) {
            if ($scope.checkMouseAndHitspotCollision(e, showingPanel.buttonMaximize.hitspot)) {
              $scope.$emit(EVENT.MAXIMIZE_VIDEO_PANEL, showingPanel);
            }
          }
          if (showingPanel.buttonPlay.visible) {
            if ($scope.checkMouseAndHitspotCollision(e, showingPanel.buttonPlay.hitspot)) {
              showingPanel.video.play();
              showingPanel.buttonPlay.visible = false;
              showingPanel.buttonPause.visible = true;
            }
          } else if (showingPanel.buttonPause.visible) {
            if ($scope.checkMouseAndHitspotCollision(e, showingPanel.buttonPause.hitspot)) {
              showingPanel.video.pause();
              showingPanel.buttonPlay.visible = true;
              showingPanel.buttonPause.visible = false;
            }
          }
          return void 0;
        }
      };
    }
  ]);
});  //# sourceMappingURL=showingvideopanel.js.map
