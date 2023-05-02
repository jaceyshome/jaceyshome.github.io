define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('TimelinePanelControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    function (EVENT, SystemParameters, ResourceModel) {
      return {
        draw: function ($scope) {
          var addMask, canvas, ctx, drawProgressionBar, drawTimeLine, endMask, timelinePanel;
          canvas = $scope.canvas;
          ctx = $scope.context;
          if (!ctx) {
            return;
          }
          timelinePanel = SystemParameters.timelinePanel;
          if (!timelinePanel) {
            return;
          }
          addMask = function () {
            return $scope.createRetangleMask(timelinePanel.retangleMask);
          };
          drawProgressionBar = function () {
            var drawDynastyProgression, progressionBar;
            progressionBar = timelinePanel.progessionBar;
            if (!progressionBar) {
              return;
            }
            drawDynastyProgression = function () {
              var drawDynasties, dynasties;
              dynasties = ResourceModel.dynasties;
              if (!dynasties) {
                return;
              }
              drawDynasties = function () {
                var drawCurrentDynastyPeriod, drawDynastyPeriod, drawPointer, dynasty, dynastyModel, dynastyModelInstance, dynastyName, dynastyNewHitspots, endYearText, i, startX, startY, startYearText, totalPeriod, _i, _j, _len, _ref;
                dynastyModel = timelinePanel.dynastyModel;
                dynastyNewHitspots = [];
                if (!timelinePanel.dynastyHitspots) {
                  timelinePanel.dynastyHitspots = [];
                }
                startX = progressionBar.x = timelinePanel.x;
                startY = progressionBar.y = timelinePanel.y;
                for (_i = 0, _len = dynasties.length; _i < _len; _i++) {
                  dynasty = dynasties[_i];
                  totalPeriod = dynasty.totalPeriod;
                  startYearText = {
                    x: startX,
                    y: startY - timelinePanel.offset / 2,
                    color: dynastyModel.startYear.color,
                    fontWeight: dynastyModel.startYear.fontWeight,
                    fontFamily: dynastyModel.startYear.fontFamily,
                    fontSize: dynastyModel.startYear.fontSize,
                    textAlign: dynastyModel.startYear.textAlign,
                    text: Math.abs(dynasty.startYear)
                  };
                  $scope.drawText(startYearText);
                  endYearText = {
                    x: startYearText.x + dynastyModel.width * totalPeriod + dynastyModel.marginLeft * (totalPeriod - 1),
                    y: startY - timelinePanel.offset / 2,
                    color: dynastyModel.endYear.color,
                    fontWeight: dynastyModel.endYear.fontWeight,
                    fontFamily: dynastyModel.endYear.fontFamily,
                    fontSize: dynastyModel.endYear.fontSize,
                    textAlign: dynastyModel.endYear.textAlign,
                    text: Math.abs(dynasty.endYear)
                  };
                  $scope.drawText(endYearText);
                  dynastyName = {
                    x: startYearText.x + (endYearText.x - startYearText.x) / 2,
                    y: startY + dynastyModel.height + timelinePanel.offset,
                    color: dynastyModel.name.color,
                    fontWeight: dynastyModel.name.fontWeight,
                    fontFamily: dynastyModel.name.fontFamily,
                    fontSize: dynastyModel.name.fontSize,
                    textAlign: dynastyModel.name.textAlign,
                    text: dynasty.name
                  };
                  $scope.drawText(dynastyName);
                  drawDynastyPeriod = function () {
                    var dynastyModelInstance;
                    dynastyModelInstance = {
                      x: startX,
                      y: startY,
                      fillColor: dynastyModel.fillColor,
                      strokeColor: dynastyModel.strokeColor,
                      fillAlpha: dynastyModel.fillAlpha,
                      strokeAlpha: dynastyModel.strokeAlpha,
                      width: dynastyModel.width,
                      height: dynastyModel.height,
                      marginLeft: dynastyModel.marginLeft,
                      fill: dynastyModel.fill
                    };
                    $scope.drawRetangle(dynastyModelInstance);
                    return dynastyModelInstance;
                  };
                  drawCurrentDynastyPeriod = function () {
                    var dynastyModelInstance;
                    dynastyModelInstance = {
                      x: startX,
                      y: startY,
                      fillColor: timelinePanel.currentDynastyModel.fillColor,
                      strokeColor: timelinePanel.currentDynastyModel.strokeColor,
                      fillAlpha: dynastyModel.fillAlpha,
                      strokeAlpha: dynastyModel.strokeAlpha,
                      width: dynastyModel.width,
                      height: dynastyModel.height,
                      marginLeft: dynastyModel.marginLeft,
                      fill: dynastyModel.fill
                    };
                    $scope.drawRetangle(dynastyModelInstance);
                    return dynastyModelInstance;
                  };
                  drawPointer = function (dynasty) {
                    var pointer, points;
                    pointer = timelinePanel.pointer;
                    points = [];
                    points.push({
                      x: dynasty.x + dynasty.width / 2,
                      y: pointer.y
                    });
                    points.push({
                      x: dynasty.x + dynasty.width / 2 - pointer.width / 2,
                      y: pointer.y + pointer.height
                    });
                    points.push({
                      x: dynasty.x + dynasty.width / 2 + pointer.width / 2,
                      y: pointer.y + pointer.height
                    });
                    pointer.points = points;
                    return $scope.drawPolygon(pointer);
                  };
                  for (i = _j = 0, _ref = totalPeriod - 1; _j <= _ref; i = _j += 1) {
                    if (dynasty.id === ResourceModel.currentDynastyId && i === ResourceModel.currentDynastyPeriod) {
                      dynastyModelInstance = drawCurrentDynastyPeriod();
                      drawPointer(dynastyModelInstance);
                    } else {
                      dynastyModelInstance = drawDynastyPeriod();
                    }
                    startX = dynastyModelInstance.x + dynastyModelInstance.width + dynastyModelInstance.marginLeft;
                    dynastyNewHitspots.push({
                      x: dynastyModelInstance.x,
                      y: dynastyModelInstance.y,
                      width: dynastyModelInstance.width,
                      height: dynastyModelInstance.height,
                      dynastyId: dynasty.id,
                      periodId: i
                    });
                  }
                  startX = startX + progressionBar.dyanstyMarginLeft;
                }
                return timelinePanel.dynastyHitspots = dynastyNewHitspots;
              };
              return drawDynasties();
            };
            return drawDynastyProgression();
          };
          drawTimeLine = function () {
            var lineBC, lineDC, textBC, textDC, timeLine;
            timeLine = timelinePanel.timeLine;
            if (!timeLine) {
              return;
            }
            timeLine.x = timelinePanel.x;
            lineBC = timeLine.lineBC;
            lineBC.startX = timeLine.x;
            lineBC.startY = timeLine.y;
            lineBC.endX = timeLine.x + lineBC.width;
            lineBC.endY = lineBC.startY;
            $scope.drawLine(lineBC);
            textBC = timeLine.textBC;
            textBC.x = lineBC.endX + timeLine.textMarginLeft;
            textBC.y = lineBC.endY;
            $scope.drawText(textBC);
            textDC = timeLine.textDC;
            textDC.x = textBC.x + timeLine.textMiddleSpace;
            textDC.y = textBC.y;
            $scope.drawText(textDC);
            lineDC = timeLine.lineDC;
            lineDC.startX = textDC.x + timeLine.textMarginRight;
            lineDC.startY = textDC.y;
            lineDC.endX = textDC.x + lineDC.width;
            lineDC.endY = lineDC.startY;
            return $scope.drawLine(lineDC);
          };
          endMask = function () {
            return $scope.endMask();
          };
          addMask();
          drawProgressionBar();
          drawTimeLine();
          return endMask();
        },
        handleMouseDown: function (e, $scope) {
          var timelinePanel;
          timelinePanel = SystemParameters.timelinePanel;
          if (!timelinePanel) {
            return;
          }
          if ($scope.checkMouseAndHitspotCollision(e, timelinePanel.hitspot)) {
            timelinePanel.mouseDownCoordinate = $scope.getMousePosition(e);
            return timelinePanel.mouseCurrentCoordinate = $scope.getMousePosition(e);
          } else {
            return timelinePanel.mouseCurrentCoordinate = void 0;
          }
        },
        handleMouseMove: function (e, $scope) {
          var moveRange, moveXDistance, timelinePanel;
          timelinePanel = SystemParameters.timelinePanel;
          moveRange = timelinePanel.moveRange;
          if (!timelinePanel) {
            return;
          }
          if (!timelinePanel.mouseCurrentCoordinate) {
            return;
          }
          timelinePanel.mouseMoveCoordinate = $scope.getMousePosition(e);
          moveXDistance = timelinePanel.mouseMoveCoordinate.x - timelinePanel.mouseCurrentCoordinate.x;
          timelinePanel.x = timelinePanel.x + moveXDistance;
          if (timelinePanel.x <= moveRange.min) {
            timelinePanel.x = moveRange.min;
          }
          if (timelinePanel.x >= moveRange.max) {
            timelinePanel.x = moveRange.max;
          }
          return timelinePanel.mouseCurrentCoordinate = timelinePanel.mouseMoveCoordinate;
        },
        handleMouseUp: function (e, $scope) {
          var hitspot, hitspots, timelinePanel, _i, _len;
          timelinePanel = SystemParameters.timelinePanel;
          if (!timelinePanel) {
            return;
          }
          timelinePanel.mouseCurrentCoordinate = void 0;
          if ($scope.checkMouseAndHitspotCollision(e, timelinePanel.hitspot)) {
            timelinePanel.mouseUpCoordinate = $scope.getMousePosition(e);
            if (Math.abs(timelinePanel.mouseUpCoordinate.x - timelinePanel.mouseDownCoordinate.x) >= 2 || Math.abs(timelinePanel.mouseUpCoordinate.y - timelinePanel.mouseDownCoordinate.y) >= 2) {
              return;
            }
            hitspots = timelinePanel.dynastyHitspots;
            for (_i = 0, _len = hitspots.length; _i < _len; _i++) {
              hitspot = hitspots[_i];
              if ($scope.checkMouseAndHitspotCollision(e, hitspot)) {
                if (ResourceModel.currentDynastyId === hitspot.dynastyId && ResourceModel.currentDynastyPeriod === hitspot.periodId) {
                  return;
                }
                $scope.$emit(EVENT.ON_CHANGE_CURRENT_DYNASTY, hitspot);
                return;
              } else {
                continue;
              }
            }
          }
        }
      };
    }
  ]);
});  //# sourceMappingURL=timelinepanel.js.map
