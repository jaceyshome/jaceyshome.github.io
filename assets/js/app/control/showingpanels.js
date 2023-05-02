define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('ShowingPanelsControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    'ShowingTextPanelControl',
    'ShowingVideoPanelControl',
    'ShowingImagePanelControl',
    function (EVENT, SystemParameters, ResourceModel, ShowingTextPanelControl, ShowingVideoPanelControl, ShowingImagePanelControl) {
      return {
        draw: function ($scope) {
          var ctx, drawResourceImagePanel, drawResourceTextPanel, drawResourceVideoPanel, drawShowingResourcePanels;
          if (ResourceModel.showingPanels.length === 0) {
            return;
          }
          ctx = $scope.context;
          if (!ctx) {
            return;
          }
          if (ResourceModel.isShowingMaximizedPanel) {
            return;
          }
          drawResourceTextPanel = function (panel) {
            if (!panel.visible) {
              return;
            }
            $scope.drawRetangle(panel.frame);
            $scope.createRetangleMask(panel.mask);
            $scope.drawParagraph(panel.text);
            $scope.endMask();
            $scope.drawPanelButton(panel.buttonClose);
            return $scope.drawPanelButton(panel.buttonMaximize);
          };
          drawResourceImagePanel = function (panel) {
            if (!panel.visible) {
              return;
            }
            $scope.drawRetangle(panel.frame);
            $scope.createRetangleMask(panel.mask);
            $scope.drawImage(panel.image);
            $scope.endMask();
            $scope.drawPanelButton(panel.buttonClose);
            return $scope.drawPanelButton(panel.buttonMaximize);
          };
          drawResourceVideoPanel = function (panel) {
            if (!panel.visible) {
              return;
            }
            $scope.drawRetangle(panel.frame);
            $scope.createRetangleMask(panel.mask);
            $scope.drawVideoPanel(panel);
            $scope.endMask();
            $scope.drawPanelButton(panel.buttonClose);
            $scope.drawPanelButton(panel.buttonMaximize);
            $scope.drawPanelButton(panel.buttonPause);
            return $scope.drawPanelButton(panel.buttonPlay);
          };
          drawShowingResourcePanels = function () {
            var panel, _i, _len, _ref, _results;
            _ref = ResourceModel.showingPanels;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              panel = _ref[_i];
              switch (panel.resource.resourceTypeId) {
              case SystemParameters.RESOURCE_TYPE.TEXT:
                _results.push(drawResourceTextPanel(panel));
                break;
              case SystemParameters.RESOURCE_TYPE.IMAGE:
                _results.push(drawResourceImagePanel(panel));
                break;
              case SystemParameters.RESOURCE_TYPE.VIDEO:
                _results.push(drawResourceVideoPanel(panel));
                break;
              default:
                _results.push(drawResourceTextPanel());
              }
            }
            return _results;
          };
          return drawShowingResourcePanels();
        },
        createShowingPanel: function ($scope, resource) {
          var getNewShowingPanelContainer, getPositionFromContainer, prepareNewShowingPanel, removeOldestShowingPanel, resourceType, typeName, _i, _len, _ref, _results;
          removeOldestShowingPanel = function (callback) {
            var data, i, showingPanelContainers, _i, _ref, _results;
            showingPanelContainers = SystemParameters.panelSettings.showingPanelContainers;
            _results = [];
            for (i = _i = 0, _ref = showingPanelContainers.length - 1; _i <= _ref; i = _i += 1) {
              if (showingPanelContainers[i].panel === ResourceModel.showingPanels[0]) {
                data = {};
                data.panel = showingPanelContainers[i].panel;
                data.callback = callback;
                $scope.$emit(EVENT.REMOVE_SHOWING_PANEL, data);
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          };
          prepareNewShowingPanel = function (callback) {
            var showingPanels;
            showingPanels = ResourceModel.showingPanels;
            if (showingPanels.length < SystemParameters.panelSettings.totalShowingPanel) {
              callback();
            } else {
              return removeOldestShowingPanel(callback);
            }
          };
          getNewShowingPanelContainer = function () {
            var container, containers, _i, _len;
            containers = SystemParameters.panelSettings.showingPanelContainers;
            container = {};
            for (_i = 0, _len = containers.length; _i < _len; _i++) {
              container = containers[_i];
              if (container.panel === void 0) {
                return container;
              }
            }
          };
          getPositionFromContainer = function (container) {
            var position;
            position = {
              x: container.x,
              y: container.y
            };
            return position;
          };
          _ref = ResourceModel.resourceTypes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            resourceType = _ref[_i];
            if (resourceType.id === resource.resourceTypeId) {
              typeName = resourceType.name;
              prepareNewShowingPanel(function () {
                var container, position;
                container = getNewShowingPanelContainer();
                position = getPositionFromContainer(container);
                switch (typeName) {
                case 'text':
                  ShowingTextPanelControl.createPanel($scope, resource, position, container);
                  break;
                case 'video':
                  $scope.$emit(EVENT.STOP_CURRENT_INTRO_AUDIO);
                  ShowingVideoPanelControl.createPanel($scope, resource, position, container);
                  break;
                case 'image':
                  ShowingImagePanelControl.createPanel($scope, resource, position, container);
                  break;
                default:
                  ShowingTextPanelControl.createPanel($scope, resource, position, container);
                  break;
                }
              });
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        },
        handleMouseMove: function () {
          return void 0;
        },
        handleMouseUp: function ($scope, e, showingPanel) {
          var resource, resourceType, typeName, _i, _len, _ref;
          if (!showingPanel.resource) {
            return;
          }
          resource = showingPanel.resource;
          _ref = ResourceModel.resourceTypes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            resourceType = _ref[_i];
            if (resourceType.id === resource.resourceTypeId) {
              typeName = resourceType.name;
              switch (typeName) {
              case 'text':
                ShowingTextPanelControl.handleMouseUp($scope, e, showingPanel);
                break;
              case 'video':
                ShowingVideoPanelControl.handleMouseUp($scope, e, showingPanel);
                break;
              case 'image':
                ShowingImagePanelControl.handleMouseUp($scope, e, showingPanel);
                break;
              default:
                ShowingTextPanelControl.handleMouseUp($scope, e, showingPanel);
                break;
              }
            }
          }
          return void 0;
        },
        pauseAllPlayingVideo: function () {
          var showingPanel, _i, _len, _ref, _results;
          if (ResourceModel.showingPanels.length === 0) {
            return;
          }
          _ref = ResourceModel.showingPanels;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            showingPanel = _ref[_i];
            if (showingPanel.video) {
              _results.push(showingPanel.video.pause());
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        },
        playAllPausedVideo: function () {
          var showingPanel, _i, _len, _ref, _results;
          if (ResourceModel.showingPanels.length === 0) {
            return;
          }
          _ref = ResourceModel.showingPanels;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            showingPanel = _ref[_i];
            if (showingPanel.video) {
              _results.push(showingPanel.video.play());
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        }
      };
    }
  ]);
});  //# sourceMappingURL=showingpanels.js.map
