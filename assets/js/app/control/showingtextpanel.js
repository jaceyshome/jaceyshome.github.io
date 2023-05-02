define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('ShowingTextPanelControl', [
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
          var newTextPanel, panelSettings, panelX, panelY, textPanelSetting;
          textPanelSetting = SystemParameters.panelSettings.textPanel;
          panelSettings = SystemParameters.panelSettings;
          panelX = position.x;
          panelY = position.y;
          newTextPanel = {
            visible: true,
            resource: resource,
            text: {
              text: resource.description,
              x: panelX + textPanelSetting.padding,
              y: panelY + textPanelSetting.padding,
              width: textPanelSetting.maxWidth - textPanelSetting.padding,
              height: textPanelSetting.maxHeight - textPanelSetting.padding,
              color: textPanelSetting.text.color,
              fontWeight: textPanelSetting.text.fontWeight,
              fontFamily: textPanelSetting.text.fontFamily,
              fontSize: textPanelSetting.text.fontSize,
              lineHeight: textPanelSetting.text.lineHeight,
              textBaseline: textPanelSetting.text.textBaseline,
              lineWidthOffset: textPanelSetting.lineWidthOffset
            },
            frame: {
              x: panelX,
              y: panelY,
              width: textPanelSetting.maxWidth,
              height: textPanelSetting.maxHeight,
              lineWidth: textPanelSetting.frame.lineWidth,
              strokeColor: textPanelSetting.frame.strokeColor,
              strokeAlpha: textPanelSetting.frame.strokeAlpha,
              fillColor: textPanelSetting.frame.fillColor,
              fillAlpha: textPanelSetting.frame.fillAlpha,
              fill: textPanelSetting.frame.fill
            },
            mask: {
              x: panelX + textPanelSetting.padding,
              y: panelY + textPanelSetting.padding,
              width: textPanelSetting.maxWidth - textPanelSetting.padding,
              height: textPanelSetting.maxHeight - textPanelSetting.padding
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
            hitspot: {
              x: panelX,
              y: panelY,
              width: textPanelSetting.maxWidth,
              height: textPanelSetting.maxHeight
            }
          };
          container.panel = newTextPanel;
          return $scope.$emit(EVENT.ADD_SHOWING_PANEL, newTextPanel);
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
              $scope.$emit(EVENT.MAXIMIZE_TEXT_PANEL, showingPanel);
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
});  //# sourceMappingURL=showingtextpanel.js.map
