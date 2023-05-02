define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('MapAreaPanelControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    'ShowingPanelsControl',
    'MaximizedPanelControl',
    function (EVENT, SystemParameters, ResourceModel, ShowingPanelsControl, MaximizedPanelControl) {
      return {
        draw: function ($scope) {
          var canvas, ctx, drawCurrentDynastyResourceIcons, mapAreaPanel;
          canvas = $scope.canvas;
          ctx = $scope.context;
          if (!ctx) {
            return;
          }
          mapAreaPanel = SystemParameters.mapAreaPanel;
          if (!mapAreaPanel) {
            return;
          }
          drawCurrentDynastyResourceIcons = function () {
            var category, currentDynasty, currentPeriod, index, resource, resourcePeriod, _i, _len, _ref, _results;
            if (!ResourceModel.currentDynasty || !ResourceModel.currentDynasty.enable) {
              return;
            }
            currentDynasty = ResourceModel.currentDynasty;
            if (currentDynasty.categories.length === 0) {
              return;
            }
            _ref = currentDynasty.categories;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              category = _ref[_i];
              if (category.iconName) {
                index = SystemParameters.categoryPanel.categoryIndexs.indexOf(category.name);
                if (!SystemParameters.categoryPanel.categoryLabels[index].enable) {
                  continue;
                }
              }
              _results.push(function () {
                var _j, _len1, _ref1, _results1;
                _ref1 = category.resources;
                _results1 = [];
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                  resource = _ref1[_j];
                  if (!resource.iconName) {
                    continue;
                  }
                  resourcePeriod = resource.dynastyPeriod;
                  currentPeriod = ResourceModel.currentDynastyPeriod;
                  if (resourcePeriod === -1 || resourcePeriod === currentPeriod) {
                    if (resource.icon) {
                      _results1.push($scope.drawMapIcon(resource.icon));
                    } else {
                      _results1.push(void 0);
                    }
                  } else {
                    _results1.push(void 0);
                  }
                }
                return _results1;
              }());
            }
            return _results;
          };
          drawCurrentDynastyResourceIcons();
          ShowingPanelsControl.draw($scope);
          return MaximizedPanelControl.draw($scope);
        },
        handleMouseUp: function (e, $scope) {
          var category, getResource, hitspot, index, mapAreaPanel, resource, showingPanel, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;
          if (!ResourceModel.currentDynasty) {
            return;
          }
          mapAreaPanel = SystemParameters.mapAreaPanel;
          if (!mapAreaPanel) {
            return;
          }
          if ($scope.checkMouseAndHitspotCollision(e, mapAreaPanel.hitspot)) {
            getResource = false;
            if (ResourceModel.showingMaximizedPanel) {
              if ($scope.checkMouseAndHitspotCollision(e, ResourceModel.showingMaximizedPanel.hitspot)) {
                MaximizedPanelControl.handleMouseUp($scope, e);
                getResource = true;
                return;
              }
            }
            if (ResourceModel.showingPanels.length > 0) {
              _ref = ResourceModel.showingPanels;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                showingPanel = _ref[_i];
                if ($scope.checkMouseAndHitspotCollision(e, showingPanel.hitspot)) {
                  ShowingPanelsControl.handleMouseUp($scope, e, showingPanel);
                  getResource = true;
                  break;
                  return;
                }
              }
            }
            _ref1 = ResourceModel.currentDynasty.categories;
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              category = _ref1[_j];
              if (getResource) {
                return;
              }
              if (category.iconName) {
                index = SystemParameters.categoryPanel.categoryIndexs.indexOf(category.name);
                if (!SystemParameters.categoryPanel.categoryLabels[index].enable) {
                  continue;
                }
              }
              _ref2 = category.resources;
              for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                resource = _ref2[_k];
                if (resource.isShowing) {
                  continue;
                }
                if (!resource.iconName) {
                  continue;
                }
                if (!resource.icon) {
                  continue;
                }
                hitspot = {
                  x: resource.x,
                  y: resource.y,
                  width: resource.icon.data.width,
                  height: resource.icon.data.height
                };
                if ($scope.checkMouseAndHitspotCollision(e, hitspot)) {
                  getResource = true;
                  ShowingPanelsControl.createShowingPanel($scope, resource);
                  break;
                  return;
                }
              }
            }
          }
        },
        handleMouseMove: function (e, $scope) {
          var data, hitspot;
          if ($scope.checkMouseAndHitspotCollision(e, SystemParameters.mapAreaPanel.hitspot)) {
            hitspot = SystemParameters.mapAreaPanel.hitspot;
            data = {
              mapCircle: {
                x: hitspot.x + hitspot.width / 2,
                y: hitspot.y + hitspot.height,
                r: hitspot.width / 2
              },
              cursor: {
                x: e.x,
                y: e.y
              }
            };
            return $scope.$emit(EVENT.UPDATE_POINTER_POSITION, data);
          }
        },
        iconsFadeIn: function ($scope, callback) {
          var category, checkAllCompleted, currentDynasty, currentPeriod, endY, iconFadeIn, iconName, index, resource, resourcePeriod, _i, _len, _ref, _results;
          if (!ResourceModel.currentDynasty || !ResourceModel.currentDynasty.enable) {
            if (callback) {
              callback();
            }
            return;
          }
          currentDynasty = ResourceModel.currentDynasty;
          if (currentDynasty.categories.length === 0) {
            return;
          }
          checkAllCompleted = function (icons) {
            var icon, _i, _len;
            for (_i = 0, _len = icons.length; _i < _len; _i++) {
              icon = icons[_i];
              if (icon.alpha !== 1) {
                return;
              }
            }
          };
          ResourceModel.iconsTweens = void 0;
          ResourceModel.iconsTweens = [];
          ResourceModel.animatingIcons = void 0;
          ResourceModel.animatingIcons = [];
          _ref = currentDynasty.categories;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            category = _ref[_i];
            if (category.iconName) {
              index = SystemParameters.categoryPanel.categoryIndexs.indexOf(category.name);
              if (!SystemParameters.categoryPanel.categoryLabels[index].enable) {
                continue;
              }
            }
            _results.push(function () {
              var _j, _len1, _ref1, _results1;
              _ref1 = category.resources;
              _results1 = [];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                resource = _ref1[_j];
                if (!resource.iconName) {
                  continue;
                }
                resourcePeriod = resource.dynastyPeriod;
                currentPeriod = ResourceModel.currentDynastyPeriod;
                if (resourcePeriod === -1 || resourcePeriod === currentPeriod) {
                  iconName = 'mapIcon';
                  if (!resource.icon) {
                    resource.icon = {
                      x: resource.x,
                      y: resource.y,
                      data: $scope.getImageByName(iconName).data,
                      alpha: 0
                    };
                  }
                  endY = resource.y;
                  resource.icon.y = endY - 10;
                  resource.icon.alpha = 1;
                  ResourceModel.animatingIcons.push(resource.icon);
                  iconFadeIn = new TWEEN.Tween(resource.icon).to({
                    y: endY,
                    alpha: 1
                  }, 500).delay(Math.floor(Math.random() * 200) + 20).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                  }).onComplete(function () {
                    return checkAllCompleted(ResourceModel.animatingIcons);
                  }).start();
                  _results1.push(ResourceModel.iconsTweens.push(iconFadeIn));
                } else {
                  _results1.push(void 0);
                }
              }
              return _results1;
            }());
          }
          return _results;
        },
        iconsFadeOut: function (callback) {
          var category, checkAllCompleted, currentDynasty, currentPeriod, iconFadeOut, index, resource, resourcePeriod, _i, _len, _ref, _results;
          if (!ResourceModel.currentDynasty || !ResourceModel.currentDynasty.enable) {
            if (callback) {
              callback();
            }
            return;
          }
          checkAllCompleted = function (icons) {
            var icon, _i, _len;
            for (_i = 0, _len = icons.length; _i < _len; _i++) {
              icon = icons[_i];
              if (icon.alpha !== 0) {
                return;
              }
            }
            return callback();
          };
          currentDynasty = ResourceModel.currentDynasty;
          if (currentDynasty.categories.length === 0) {
            return;
          }
          ResourceModel.iconsTweens = void 0;
          ResourceModel.iconsTweens = [];
          ResourceModel.animatingIcons = void 0;
          ResourceModel.animatingIcons = [];
          _ref = currentDynasty.categories;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            category = _ref[_i];
            if (category.iconName) {
              index = SystemParameters.categoryPanel.categoryIndexs.indexOf(category.name);
              if (!SystemParameters.categoryPanel.categoryLabels[index].enable) {
                continue;
              }
            }
            _results.push(function () {
              var _j, _len1, _ref1, _results1;
              _ref1 = category.resources;
              _results1 = [];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                resource = _ref1[_j];
                if (!resource.iconName) {
                  continue;
                }
                resourcePeriod = resource.dynastyPeriod;
                currentPeriod = ResourceModel.currentDynastyPeriod;
                if (resourcePeriod === -1 || resourcePeriod === currentPeriod) {
                  ResourceModel.animatingIcons.push(resource.icon);
                  iconFadeOut = new TWEEN.Tween(resource.icon).to({
                    y: resource.y - 10,
                    alpha: 0
                  }, 300).delay(10).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                  }).onComplete(function () {
                    return checkAllCompleted(ResourceModel.animatingIcons);
                  }).start();
                  _results1.push(ResourceModel.iconsTweens.push(iconFadeOut));
                } else {
                  _results1.push(void 0);
                }
              }
              return _results1;
            }());
          }
          return _results;
        }
      };
    }
  ]);
});  //# sourceMappingURL=mapareapanel.js.map
