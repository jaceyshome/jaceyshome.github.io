define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('NavigationPanelControl', [
    'SystemParameters',
    'ResourceModel',
    function (SystemParameters, ResourceModel) {
      return {
        update: function ($scope) {
          var navigationPanel, updateSoundEffect;
          navigationPanel = SystemParameters.navigationPanel;
          if (!navigationPanel) {
            return;
          }
          updateSoundEffect = function () {
            var soundEffect, updateLineChart;
            soundEffect = navigationPanel.soundEffect;
            if (!soundEffect) {
              return;
            }
            updateLineChart = function () {
              var cylinder, cylinderIndex, cylinders, eqData, i, j, left, lineChart, right, _i, _j, _k, _l, _len, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _results, _results1, _results2;
              lineChart = soundEffect.lineChart;
              eqData = $scope.eqData;
              if (!$scope.eqData) {
                _ref = lineChart.cylinders;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  cylinder = _ref[_i];
                  _results.push(cylinder.percentage = 0);
                }
                return _results;
              } else {
                left = eqData.left;
                right = eqData.right;
                cylinderIndex = 0;
                cylinders = lineChart.cylinders;
                if (!left || left.length === 0) {
                  for (cylinderIndex = _j = 0, _ref1 = cylinders.length / 2 - 1; _j <= _ref1; cylinderIndex = _j += 1) {
                    cylinders[cylinderIndex].percentage = 0;
                  }
                } else {
                  for (i = _k = 0, _ref2 = left.length - 1; _k <= _ref2; i = _k += 60) {
                    cylinders[cylinderIndex].percentage = left[i] * 1.2;
                    cylinderIndex++;
                  }
                }
                if (!right || right.length === 0) {
                  _results1 = [];
                  for (cylinderIndex = _l = _ref3 = cylinders.length / 2 - 1, _ref4 = cylinders.length - 1; _l <= _ref4; cylinderIndex = _l += 1) {
                    _results1.push(cylinders[cylinderIndex].percentage = 0);
                  }
                  return _results1;
                } else {
                  _results2 = [];
                  for (j = _m = 0, _ref5 = right.length - 1; _m <= _ref5; j = _m += 60) {
                    cylinders[cylinderIndex].percentage = right[j] * 1.2;
                    _results2.push(cylinderIndex++);
                  }
                  return _results2;
                }
              }
            };
            return updateLineChart();
          };
          return updateSoundEffect();
        },
        draw: function ($scope) {
          var canvas, ctx, drawdashboard;
          canvas = $scope.canvas;
          ctx = $scope.context;
          if (!ctx) {
            return;
          }
          drawdashboard = function () {
            var drawConnect, drawDateAndTime, drawFolderLabels, drawLineCharts, drawLocation, drawPowerChart, drawProgress, drawSignal, drawSoundEffect, drawTopicStates, navigationPanel;
            navigationPanel = SystemParameters.navigationPanel;
            if (!navigationPanel) {
              return;
            }
            drawPowerChart = function () {
              var chart, index, model, retangle, total, _i, _results;
              chart = navigationPanel.power.percentage;
              if (!chart) {
                return;
              }
              model = chart.chartModel;
              if (!model) {
                return;
              }
              total = chart.value / Math.abs(model.step);
              _results = [];
              for (index = _i = 1; 1 <= total ? _i <= total : _i >= total; index = 1 <= total ? ++_i : --_i) {
                retangle = {
                  x: model.startX + (model.gap + model.width) * index * model.xOffset,
                  y: model.startY + (model.gap + model.height) * index * model.yOffset,
                  width: model.width,
                  height: model.height,
                  fill: model.fill
                };
                _results.push($scope.drawRetangle(retangle));
              }
              return _results;
            };
            drawLocation = function () {
              var location;
              location = navigationPanel.location;
              if (!location) {
                return;
              }
              $scope.drawText(location.n.label);
              $scope.drawText(location.n.text);
              $scope.drawText(location.e.label);
              $scope.drawText(location.e.text);
              $scope.drawCircle(location.circle);
              return $scope.drawCircle(location.pointer);
            };
            drawProgress = function () {
              var completedLine, pointer, progress, state, wholeLine;
              progress = navigationPanel.progress;
              if (!progress) {
                return;
              }
              $scope.drawText(progress.label);
              $scope.drawText(progress.percentage);
              state = progress.state;
              wholeLine = {
                startX: state.x,
                startY: state.y,
                endX: state.x + state.width,
                endY: state.y,
                strokeColor: 'WHITE',
                lineWidth: state.lineWidth
              };
              completedLine = {
                startX: state.x,
                startY: state.y,
                endX: state.x + state.width * state.complete,
                endY: state.y,
                strokeColor: state.completeStrokeColor,
                lineWidth: state.completeLineWidth
              };
              $scope.drawLine(wholeLine);
              $scope.drawLine(completedLine);
              pointer = {
                x: completedLine.endX - state.pointer.width / 2,
                y: completedLine.endY - state.pointer.height / 2,
                width: state.pointer.width,
                height: state.pointer.height,
                fillColor: state.pointer.fillColor,
                strokeColor: state.pointer.strokeColor,
                fill: state.pointer.fill
              };
              return $scope.drawRetangle(pointer);
            };
            drawTopicStates = function () {
              var gap, height, offset, state, statePercentage, states, width, _i, _len, _results;
              states = navigationPanel.topicStates;
              if (!states) {
                return;
              }
              _results = [];
              for (_i = 0, _len = states.length; _i < _len; _i++) {
                state = states[_i];
                $scope.drawText(state.label);
                width = 8;
                height = 6;
                gap = 5;
                offset = 0;
                statePercentage = {
                  x: state.label.x - width - gap,
                  y: state.label.y - height * state.statePercentage.completePercentage - offset,
                  width: width,
                  height: height * state.statePercentage.completePercentage,
                  fillColor: 'SKYBLUE',
                  strokeColor: 'SKYBLUE',
                  lineWidth: 0,
                  fill: true
                };
                _results.push($scope.drawRetangle(statePercentage));
              }
              return _results;
            };
            drawFolderLabels = function () {
              var folderLabel, folderLabels, _i, _len, _results;
              folderLabels = navigationPanel.folderLabels;
              if (!folderLabels) {
                return;
              }
              _results = [];
              for (_i = 0, _len = folderLabels.length; _i < _len; _i++) {
                folderLabel = folderLabels[_i];
                _results.push($scope.drawText(folderLabel));
              }
              return _results;
            };
            drawLineCharts = function (lineChart) {
              var cylinder, cylinders, gap, height, startX, startY, width, _i, _len, _results;
              if (!lineChart) {
                return;
              }
              cylinders = lineChart.cylinders;
              startX = lineChart.startX;
              startY = lineChart.startY;
              gap = lineChart.gap;
              width = lineChart.width;
              height = lineChart.height;
              _results = [];
              for (_i = 0, _len = cylinders.length; _i < _len; _i++) {
                cylinder = cylinders[_i];
                cylinder.fill = true;
                cylinder.lineWidth = 1;
                cylinder.points = [
                  {
                    x: startX + gap,
                    y: startY + height * (1 - cylinder.percentage)
                  },
                  {
                    x: startX + gap,
                    y: startY + height
                  },
                  {
                    x: startX + gap + width,
                    y: startY + height
                  },
                  {
                    x: startX + gap + width,
                    y: startY + height * (1 - cylinder.percentage)
                  }
                ];
                $scope.drawPolygon(cylinder);
                _results.push(startX = startX + width + gap);
              }
              return _results;
            };
            drawSoundEffect = function () {
              var soundEffect;
              soundEffect = navigationPanel.soundEffect;
              if (!soundEffect) {
                return;
              }
              $scope.drawRetangle(soundEffect.retangleMarker);
              $scope.drawPolygon(soundEffect.polygonMarker);
              return drawLineCharts(soundEffect.lineChart);
            };
            drawDateAndTime = function () {
              var dateAndTime;
              dateAndTime = navigationPanel.dateAndTime;
              if (!dateAndTime) {
                return;
              }
              $scope.drawRetangle(dateAndTime.retangle);
              $scope.drawText(dateAndTime.date);
              return $scope.drawText(dateAndTime.time);
            };
            drawSignal = function () {
              var line, signal, _i, _len, _ref;
              signal = navigationPanel.signal;
              if (!signal) {
                return;
              }
              _ref = signal.icon.lines;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                line = _ref[_i];
                $scope.drawLine(line);
              }
              return drawLineCharts(signal.bar);
            };
            drawConnect = function () {
              var circle, connect, gap, i, startX, y, _i, _j, _len, _ref, _ref1, _results;
              connect = navigationPanel.connect;
              if (!connect) {
                return;
              }
              if (connect.bgImage === void 0) {
                connect.bgImage = $scope.getImageByName('connect');
              }
              $scope.drawImage(connect.bgImage);
              if (connect.circles.length === 0) {
                startX = connect.startX;
                y = connect.y;
                gap = connect.gap;
                for (i = _i = 0, _ref = connect.totalNumber - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                  connect.circles.push({
                    x: startX + gap,
                    y: y,
                    fill: false,
                    fillColor: connect.fillColor,
                    strokeColor: connect.strokeColor,
                    index: i,
                    r: connect.r
                  });
                  startX = startX + gap;
                }
              }
              _ref1 = connect.circles;
              _results = [];
              for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
                circle = _ref1[_j];
                if (circle.index === 2) {
                  circle.fill = true;
                }
                _results.push($scope.drawCircle(circle));
              }
              return _results;
            };
            if (navigationPanel.bgImage === void 0) {
              navigationPanel.bgImage = $scope.getImageByName('dashboard_bg');
            }
            $scope.drawImage(navigationPanel.bgImage);
            if (navigationPanel.spaceship === void 0) {
              navigationPanel.spaceship = $scope.getImageByName('dashboard_spaceship');
            }
            $scope.drawImage(navigationPanel.spaceship);
            $scope.drawText(navigationPanel.userName);
            if (navigationPanel.title.text) {
              navigationPanel.title.text = navigationPanel.title.text.toUpperCase();
              $scope.drawText(navigationPanel.title);
              $scope.drawText(navigationPanel.subTitle);
              $scope.drawText(navigationPanel.startYear);
              $scope.drawText(navigationPanel.startYearPeriod);
              $scope.drawText(navigationPanel.endYear);
              $scope.drawText(navigationPanel.endYearPeriod);
            }
            $scope.drawRetangle(navigationPanel.power.frame);
            $scope.drawText(navigationPanel.power.label);
            $scope.drawText(navigationPanel.power.percentage);
            drawPowerChart();
            drawLocation();
            drawProgress();
            drawTopicStates();
            drawFolderLabels();
            $scope.drawText(navigationPanel.level);
            $scope.drawText(navigationPanel.logoutButton);
            drawSoundEffect();
            drawDateAndTime();
            drawSignal();
            return drawConnect();
          };
          return drawdashboard();
        },
        changeCurrentDynasty: function () {
          var currentDynasty, navigationPanel, updatePeriod, updateTitle;
          navigationPanel = SystemParameters.navigationPanel;
          if (!navigationPanel) {
            return;
          }
          if (!ResourceModel.currentDynasty) {
            return;
          }
          currentDynasty = ResourceModel.currentDynasty;
          updateTitle = function () {
            return navigationPanel.title.text = currentDynasty.name;
          };
          updatePeriod = function () {
            var averageYears, currentEndYear, currentPeriod, currentStartYear, totalPeriod;
            totalPeriod = currentDynasty.totalPeriod;
            averageYears = Math.floor(Math.abs(currentDynasty.endYear - currentDynasty.startYear) / totalPeriod);
            currentPeriod = ResourceModel.currentDynastyPeriod;
            currentStartYear = currentDynasty.startYear + averageYears * currentPeriod;
            if (currentPeriod + 1 !== totalPeriod) {
              currentEndYear = currentDynasty.startYear + averageYears * (currentPeriod + 1);
            } else {
              currentEndYear = currentDynasty.endYear;
            }
            navigationPanel.startYear.text = Math.abs(currentStartYear);
            navigationPanel.startYearPeriod.text = currentStartYear >= 0 ? 'DC -' : 'BC -';
            navigationPanel.endYear.text = Math.abs(currentEndYear);
            return navigationPanel.endYearPeriod.text = currentEndYear >= 0 ? 'DC' : 'BC';
          };
          updateTitle();
          return updatePeriod();
        },
        handleMouseUp: function (e, $scope) {
          var logoutButton, navigationPanel;
          navigationPanel = SystemParameters.navigationPanel;
          if (!navigationPanel) {
            return;
          }
          logoutButton = navigationPanel.logoutButton;
          if ($scope.checkMouseAndHitspotCollision(e, logoutButton.hitspot)) {
            return alert('logout');
          }
        },
        updateLocation: function (data) {
          var D, Eb, Evalue, Nvalue, cursor, cursorTmp, location, locationCircle, mapCircle, mapPointer;
          location = SystemParameters.navigationPanel.location;
          mapCircle = data.mapCircle;
          cursor = data.cursor;
          D = Math.sqrt(Math.pow(mapCircle.x - cursor.x, 2) + Math.pow(mapCircle.y - cursor.y, 2));
          if (D <= mapCircle.r) {
            mapPointer = {
              x: cursor.x,
              y: cursor.y,
              r: cursor.r
            };
          } else {
            cursorTmp = {
              x: 0,
              y: 0
            };
            cursorTmp.x = mapCircle.x + mapCircle.r / D * (cursor.x - mapCircle.x);
            cursorTmp.y = mapCircle.y + mapCircle.r / D * (cursor.y - mapCircle.y);
            mapPointer = {
              x: cursorTmp.x,
              y: cursorTmp.y,
              r: cursorTmp.r
            };
          }
          locationCircle = location.circle;
          location.pointer.x = locationCircle.x - locationCircle.r / mapCircle.r * (mapCircle.x - mapPointer.x);
          location.pointer.y = locationCircle.y - locationCircle.r / mapCircle.r * (mapCircle.y - mapPointer.y);
          Nvalue = ((38 - location.pointer.y) * 90 / 11).toFixed(2);
          Eb = 187 - 330 / 75;
          Evalue = ((location.pointer.x - Eb) * 75 / 11).toFixed(2);
          location.e.text.text = Evalue;
          return location.n.text.text = Nvalue;
        }
      };
    }
  ]);
});  //# sourceMappingURL=navigationpanel.js.map
