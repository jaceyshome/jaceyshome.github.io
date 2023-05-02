define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('CategoryPanelControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    function (EVENT, SystemParameters, ResourceModel) {
      return {
        draw: function ($scope) {
          var canvas, categoryLabel, categoryLabels, categoryPanel, ctx, endY, i, offsetHeight, offsetX, offsetY, resourceCategories, startY, _i, _ref, _results;
          canvas = $scope.canvas;
          ctx = $scope.context;
          if (!ctx) {
            return;
          }
          categoryPanel = SystemParameters.categoryPanel;
          if (!categoryPanel) {
            return;
          }
          resourceCategories = ResourceModel.resourceCategories;
          if (!resourceCategories) {
            return;
          }
          categoryLabels = categoryPanel.categoryLabels;
          if (!categoryLabels) {
            return;
          }
          _results = [];
          for (i = _i = 0, _ref = categoryLabels.length - 1; _i <= _ref; i = _i += 1) {
            categoryLabel = categoryLabels[i];
            if (categoryLabel.enable) {
              categoryPanel.enableRetangle.y = categoryLabel.y - 12;
              categoryPanel.enableRetangle.innerRetangle.y = categoryLabel.y - 8;
              $scope.drawRetangle(categoryPanel.enableRetangle);
              $scope.drawRetangle(categoryPanel.enableRetangle.innerRetangle);
              $scope.drawText(categoryLabel);
            } else {
              categoryPanel.disableRetangle.y = categoryLabel.y - 12;
              $scope.drawRetangle(categoryPanel.disableRetangle);
              $scope.drawText(categoryLabel);
            }
            offsetX = -5;
            offsetY = -13;
            categoryLabel.hitspot = {
              x: categoryPanel.enableRetangle.x + offsetX,
              y: categoryLabel.y + offsetY,
              width: categoryPanel.panelWidth,
              height: 16
            };
            if (i === 0) {
              startY = categoryLabel.y - 13;
            }
            if (i === categoryLabels.length - 1) {
              endY = categoryLabel.y - 13;
              offsetY = 5;
              offsetHeight = 25;
              _results.push(categoryPanel.hitspot = {
                x: categoryPanel.enableRetangle.x + offsetX,
                y: startY - offsetY,
                height: endY - startY + offsetHeight,
                width: categoryPanel.panelWidth
              });
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        },
        handleMouseUp: function (e, $scope) {
          var categoryPanel, handleLabelsMouseUpEvent;
          categoryPanel = SystemParameters.categoryPanel;
          if (!categoryPanel) {
            return;
          }
          handleLabelsMouseUpEvent = function (e) {
            var label, _i, _len, _ref;
            _ref = categoryPanel.categoryLabels;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              label = _ref[_i];
              if ($scope.checkMouseAndHitspotCollision(e, label.hitspot)) {
                label.enable = !label.enable;
                $scope.$emit(EVENT.CLEAR_SHOWING_PANELS);
                return;
              } else {
                continue;
              }
            }
          };
          if ($scope.checkMouseAndHitspotCollision(e, categoryPanel.hitspot)) {
            return handleLabelsMouseUpEvent(e);
          }
        }
      };
    }
  ]);
});  //# sourceMappingURL=categorypanel.js.map
