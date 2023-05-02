define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('ShowingImagePanelControl', [
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
          var imagePanelSetting, newImagePanel, panelHeight, panelSettings, panelWidth, panelX, panelY;
          imagePanelSetting = SystemParameters.panelSettings.imagePanel;
          panelSettings = SystemParameters.panelSettings;
          panelX = position.x;
          panelY = position.y;
          panelWidth = imagePanelSetting.maxWidth;
          panelHeight = imagePanelSetting.maxHeight;
          newImagePanel = {
            visible: true,
            resource: resource,
            image: {
              x: void 0,
              y: void 0,
              url: resource.description,
              width: void 0,
              height: void 0,
              data: void 0
            },
            frame: {
              x: void 0,
              y: void 0,
              width: void 0,
              height: void 0,
              lineWidth: imagePanelSetting.frame.lineWidth,
              strokeColor: imagePanelSetting.frame.strokeColor,
              strokeAlpha: imagePanelSetting.frame.strokeAlpha,
              fillColor: imagePanelSetting.frame.fillColor,
              fillAlpha: imagePanelSetting.frame.fillAlpha,
              fill: imagePanelSetting.frame.fill
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
              visible: panelSettings.buttonClose.visible
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
              visible: panelSettings.buttonMaximize.visible
            },
            mask: {},
            hitspot: {}
          };
          return $scope.loadImageData(newImagePanel.image, function () {
            panelX = position.x;
            panelY = position.y;
            panelWidth = imagePanelSetting.maxWidth;
            panelHeight = imagePanelSetting.maxHeight;
            newImagePanel.image.x = panelX + imagePanelSetting.padding;
            newImagePanel.image.y = panelY + imagePanelSetting.padding;
            newImagePanel.image.width = panelWidth - imagePanelSetting.padding * 2;
            newImagePanel.image.height = panelHeight - imagePanelSetting.padding * 2;
            newImagePanel.frame.x = panelX;
            newImagePanel.frame.y = panelY;
            newImagePanel.frame.width = panelWidth;
            newImagePanel.frame.height = panelHeight;
            newImagePanel.mask.x = panelX + imagePanelSetting.padding;
            newImagePanel.mask.y = panelY + imagePanelSetting.padding;
            newImagePanel.mask.width = panelWidth - imagePanelSetting.padding;
            newImagePanel.mask.height = panelHeight - imagePanelSetting.padding;
            newImagePanel.hitspot.x = panelX;
            newImagePanel.hitspot.y = panelY;
            newImagePanel.hitspot.width = panelWidth;
            newImagePanel.hitspot.height = panelHeight;
            container.panel = newImagePanel;
            return $scope.$emit(EVENT.ADD_SHOWING_PANEL, newImagePanel);
          });
        },
        handleMouseMove: function () {
          return void 0;
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
              $scope.$emit(EVENT.MAXIMIZE_IMAGE_PANEL, showingPanel);
            }
          }
          return void 0;
        },
        handleMouseDown: function () {
          return void 0;
        }
      };
    }
  ]);
});  //# sourceMappingURL=showingimagepanel.js.map
