define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('MaximizedPanelControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    function (EVENT, SystemParameters, ResourceModel) {
      return {
        draw: function ($scope) {
          var ctx, drawMaximizedImagePanel, drawMaximizedPanel, drawMaximizedTextPanel, drawMaximizedVideoPanel;
          if (!ResourceModel.showingMaximizedPanel) {
            return;
          }
          ctx = $scope.context;
          if (!ctx) {
            return;
          }
          drawMaximizedTextPanel = function (panel) {
            if (!panel.visible) {
              return;
            }
            $scope.drawRetangle(panel.frame);
            $scope.createRetangleMask(panel.mask);
            $scope.drawParagraph(panel.text);
            $scope.endMask();
            $scope.drawPanelButton(panel.buttonClose);
            if (panel.buttonMaximize) {
              $scope.drawPanelButton(panel.buttonMaximize);
            }
            if (panel.buttonRestoreDown) {
              return $scope.drawPanelButton(panel.buttonRestoreDown);
            }
          };
          drawMaximizedImagePanel = function (panel) {
            if (!panel.visible) {
              return;
            }
            $scope.drawRetangle(panel.frame);
            $scope.createRetangleMask(panel.mask);
            $scope.drawImage(panel.image);
            $scope.endMask();
            $scope.drawPanelButton(panel.buttonClose);
            if (panel.buttonMaximize) {
              $scope.drawPanelButton(panel.buttonMaximize);
            }
            if (panel.buttonRestoreDown) {
              return $scope.drawPanelButton(panel.buttonRestoreDown);
            }
          };
          drawMaximizedVideoPanel = function (panel) {
            if (!panel.visible) {
              return;
            }
            $scope.drawRetangle(panel.frame);
            $scope.createRetangleMask(panel.mask);
            $scope.drawVideoPanel(panel);
            $scope.endMask();
            $scope.drawPanelButton(panel.buttonClose);
            if (panel.buttonMaximize) {
              $scope.drawPanelButton(panel.buttonMaximize);
            }
            if (panel.buttonRestoreDown) {
              $scope.drawPanelButton(panel.buttonRestoreDown);
            }
            if (panel.buttonPause) {
              $scope.drawPanelButton(panel.buttonPause);
            }
            if (panel.buttonPlay) {
              return $scope.drawPanelButton(panel.buttonPlay);
            }
          };
          drawMaximizedPanel = function () {
            var panel, resourceTypeId;
            if (!ResourceModel.showingMaximizedPanel) {
              return;
            }
            resourceTypeId = ResourceModel.showingMaximizedPanel.originalPanel.resource.resourceTypeId;
            panel = ResourceModel.showingMaximizedPanel;
            switch (resourceTypeId) {
            case SystemParameters.RESOURCE_TYPE.TEXT:
              return drawMaximizedTextPanel(panel);
            case SystemParameters.RESOURCE_TYPE.IMAGE:
              return drawMaximizedImagePanel(panel);
            case SystemParameters.RESOURCE_TYPE.VIDEO:
              return drawMaximizedVideoPanel(panel);
            default:
              return drawResourceTextPanel();
            }
          };
          return drawMaximizedPanel();
        },
        creatingMaximizedTextPanel: function ($scope, originalPanel, callback) {
          var padding, panelHeight, panelModel, panelSettings, panelWidth, panelX, panelY, textPanel;
          panelSettings = SystemParameters.panelSettings;
          panelModel = SystemParameters.panelSettings.maximizedPanel;
          panelX = panelModel.x;
          panelY = panelModel.y;
          padding = panelModel.padding;
          panelWidth = panelModel.width;
          panelHeight = panelModel.height;
          textPanel = {
            visible: true,
            originalPanel: originalPanel,
            text: {
              text: originalPanel.resource.description,
              x: panelX + padding,
              y: panelY + padding,
              width: panelWidth - padding * 2,
              height: panelHeight - padding * 2,
              color: originalPanel.text.color,
              fontWeight: originalPanel.text.fontWeight,
              fontFamily: originalPanel.text.fontFamily,
              fontSize: panelModel.fontSize,
              lineHeight: panelModel.lineHeight,
              textBaseline: originalPanel.text.textBaseline,
              lineWidthOffset: panelModel.lineWidthOffset
            },
            frame: {
              x: panelX,
              y: panelY,
              width: panelWidth,
              height: panelHeight,
              lineWidth: originalPanel.frame.lineWidth,
              strokeColor: originalPanel.frame.strokeColor,
              strokeAlpha: originalPanel.frame.strokeAlpha,
              fillColor: originalPanel.frame.fillColor,
              fillAlpha: originalPanel.frame.fillAlpha,
              fill: originalPanel.frame.fill
            },
            mask: {
              x: panelX + padding,
              y: panelY + padding,
              width: panelWidth - padding * 2,
              height: panelHeight - padding * 2
            },
            buttonClose: {
              data: $scope.getImageByName(panelSettings.buttonClose.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: true
            },
            buttonRestoreDown: {
              data: $scope.getImageByName(panelSettings.buttonRestoreDown.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY + panelSettings.maximizedButton.height,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY + panelSettings.maximizedButton.height,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: true
            },
            hitspot: {
              x: panelX,
              y: panelY,
              width: panelWidth,
              height: panelHeight
            }
          };
          ResourceModel.showingMaximizedPanel = textPanel;
          if (callback) {
            return callback();
          }
        },
        creatingMaximizedImagePanel: function ($scope, originalPanel, callback) {
          var newImagePanel, padding, panelHeight, panelModel, panelSettings, panelWidth, panelX, panelY;
          panelSettings = SystemParameters.panelSettings;
          panelModel = SystemParameters.panelSettings.maximizedPanel;
          panelX = panelModel.x;
          panelY = panelModel.y;
          padding = panelModel.padding;
          panelWidth = panelModel.width;
          panelHeight = panelModel.height;
          newImagePanel = {
            visible: true,
            originalPanel: originalPanel,
            image: {
              x: panelX + padding,
              y: panelY + padding,
              width: panelWidth - padding * 2,
              height: panelHeight - padding * 2,
              data: originalPanel.image.data
            },
            frame: {
              x: panelX,
              y: panelY,
              width: panelWidth,
              height: panelHeight,
              lineWidth: originalPanel.frame.lineWidth,
              strokeColor: originalPanel.frame.strokeColor,
              strokeAlpha: originalPanel.frame.strokeAlpha,
              fillColor: originalPanel.frame.fillColor,
              fillAlpha: originalPanel.frame.fillAlpha,
              fill: originalPanel.frame.fill
            },
            mask: {
              x: panelX + padding,
              y: panelY + padding,
              width: panelWidth - padding * 2,
              height: panelHeight - padding * 2
            },
            buttonClose: {
              data: $scope.getImageByName(panelSettings.buttonClose.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: true
            },
            buttonRestoreDown: {
              data: $scope.getImageByName(panelSettings.buttonRestoreDown.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY + panelSettings.maximizedButton.height,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY + panelSettings.maximizedButton.height,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: true
            },
            hitspot: {
              x: panelX,
              y: panelY,
              width: panelWidth,
              height: panelHeight
            }
          };
          ResourceModel.showingMaximizedPanel = newImagePanel;
          if (callback) {
            return callback();
          }
        },
        creatingMaximizedVideoPanel: function ($scope, originalPanel, callback) {
          var newVideoPanel, padding, panelHeight, panelModel, panelSettings, panelWidth, panelX, panelY;
          panelSettings = SystemParameters.panelSettings;
          panelModel = SystemParameters.panelSettings.maximizedPanel;
          panelX = panelModel.x;
          panelY = panelModel.y;
          padding = panelModel.padding;
          panelWidth = panelModel.width;
          panelHeight = panelModel.height;
          newVideoPanel = {
            visible: true,
            originalPanel: originalPanel,
            videoId: originalPanel.videoId,
            video: originalPanel.video,
            x: panelX + padding,
            y: panelY + padding,
            width: panelWidth - padding * 2,
            height: panelHeight - padding * 2,
            frame: {
              x: panelX,
              y: panelY,
              width: panelWidth,
              height: panelHeight,
              lineWidth: originalPanel.frame.lineWidth,
              strokeColor: originalPanel.frame.strokeColor,
              strokeAlpha: originalPanel.frame.strokeAlpha,
              fillColor: originalPanel.frame.fillColor,
              fillAlpha: originalPanel.frame.fillAlpha,
              fill: originalPanel.frame.fill
            },
            mask: {
              x: panelX + padding,
              y: panelY + padding,
              width: panelWidth - padding,
              height: panelHeight - padding
            },
            buttonClose: {
              data: $scope.getImageByName(panelSettings.buttonClose.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: true
            },
            buttonRestoreDown: {
              data: $scope.getImageByName(panelSettings.buttonRestoreDown.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY + panelSettings.maximizedButton.height,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY + panelSettings.maximizedButton.height,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: true
            },
            buttonPause: {
              data: $scope.getImageByName(panelSettings.buttonPause.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY + panelSettings.maximizedButton.height * 2 - 5,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY + +panelSettings.maximizedButton.height * 2,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: true
            },
            buttonPlay: {
              data: $scope.getImageByName(panelSettings.buttonPlay.buttonName).data,
              x: panelX + panelWidth - panelSettings.maximizedButton.width,
              y: panelY + panelSettings.maximizedButton.height * 2 - 5,
              width: panelSettings.maximizedButton.width,
              height: panelSettings.maximizedButton.height,
              hitspot: {
                x: panelX + panelWidth - panelSettings.maximizedButton.width,
                y: panelY + +panelSettings.maximizedButton.height * 2,
                width: panelSettings.maximizedButton.width,
                height: panelSettings.maximizedButton.height
              },
              visible: false
            },
            hitspot: {
              x: panelX,
              y: panelY,
              width: panelWidth,
              height: panelHeight
            }
          };
          ResourceModel.showingMaximizedPanel = newVideoPanel;
          if (callback) {
            return callback();
          }
        },
        handleMouseUp: function ($scope, e) {
          var data, maximizedPanel, _ref, _ref1;
          if (!ResourceModel.showingMaximizedPanel) {
            return;
          }
          maximizedPanel = ResourceModel.showingMaximizedPanel;
          if ($scope.checkMouseAndHitspotCollision(e, maximizedPanel.buttonClose.hitspot)) {
            data = { originalPanel: maximizedPanel.originalPanel };
            $scope.$emit(EVENT.REMOVE_SHOWING_MAXIMAIZE_PANEL, data);
            data = { panel: maximizedPanel.originalPanel };
            $scope.$emit(EVENT.REMOVE_SHOWING_PANEL, data);
            return;
          }
          if ($scope.checkMouseAndHitspotCollision(e, maximizedPanel.buttonRestoreDown.hitspot)) {
            data = { originalPanel: maximizedPanel.originalPanel };
            $scope.$emit(EVENT.REMOVE_SHOWING_MAXIMAIZE_PANEL, data);
            return;
          }
          if ((_ref = maximizedPanel.buttonPlay) != null ? _ref.visible : void 0) {
            if ($scope.checkMouseAndHitspotCollision(e, maximizedPanel.buttonPlay.hitspot)) {
              maximizedPanel.video.play();
              maximizedPanel.buttonPlay.visible = false;
              return maximizedPanel.buttonPause.visible = true;
            }
          } else if ((_ref1 = maximizedPanel.buttonPause) != null ? _ref1.visible : void 0) {
            if ($scope.checkMouseAndHitspotCollision(e, maximizedPanel.buttonPause.hitspot)) {
              maximizedPanel.video.pause();
              maximizedPanel.buttonPlay.visible = true;
              return maximizedPanel.buttonPause.visible = false;
            }
          }
        }
      };
    }
  ]);
});  //# sourceMappingURL=maximizedpanel.js.map
