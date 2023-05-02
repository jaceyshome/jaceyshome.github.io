define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('LoginScreenControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    function (EVENT, SystemParameters, ResourceModel) {
      return {
        init: function () {
          var cell, cellHeight, cellWidth, i, j, loginRetangleColumns, retangleColumn, totalColumnCells, totalColumns, _i, _j, _ref, _ref1, _results;
          totalColumns = 32;
          totalColumnCells = 22;
          cellWidth = 32;
          cellHeight = 32;
          loginRetangleColumns = SystemParameters.loginScreen.loginRetangleColumns;
          _results = [];
          for (i = _i = 0, _ref = totalColumns - 1; _i <= _ref; i = _i += 1) {
            retangleColumn = {
              cells: [],
              completed: false
            };
            for (j = _j = 0, _ref1 = totalColumnCells - 1; _j <= _ref1; j = _j += 1) {
              cell = {
                width: cellWidth,
                height: cellHeight,
                fill: true,
                fillColor: 'PANELBG',
                strokeColor: 'PANELBG',
                x: i * cellWidth,
                y: j * cellHeight,
                visible: true
              };
              retangleColumn.cells.push(cell);
            }
            _results.push(loginRetangleColumns.push(retangleColumn));
          }
          return _results;
        },
        fadeOutColumnCells: function (callback) {
          var allCellCompleted, cell, checkAllColumns, loginRetangleColumns, retangleColumn, _i, _j, _len, _len1, _ref;
          loginRetangleColumns = SystemParameters.loginScreen.loginRetangleColumns;
          if (loginRetangleColumns.length === 0) {
            return;
          }
          checkAllColumns = function () {
            var allColumnsCompleted, retangleColumn, _i, _len;
            allColumnsCompleted = true;
            for (_i = 0, _len = loginRetangleColumns.length; _i < _len; _i++) {
              retangleColumn = loginRetangleColumns[_i];
              if (!retangleColumn.completed) {
                allColumnsCompleted = false;
              }
            }
            SystemParameters.loginScreen.isCoverFadeOut = allColumnsCompleted;
            if (allColumnsCompleted) {
              if (callback) {
                return callback();
              }
            }
          };
          for (_i = 0, _len = loginRetangleColumns.length; _i < _len; _i++) {
            retangleColumn = loginRetangleColumns[_i];
            if (retangleColumn.completed) {
              continue;
            }
            allCellCompleted = true;
            _ref = retangleColumn.cells;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              cell = _ref[_j];
              if (cell.visible) {
                allCellCompleted = false;
                if (Math.floor(Math.random() * 100 + 1) % 20 === 0) {
                  cell.visible = false;
                }
              }
            }
            retangleColumn.completed = allCellCompleted;
          }
          return checkAllColumns();
        },
        drawCover: function ($scope) {
          var alphaCtx, betaCtx, cell, cellMask, ctx, loginRetangleColumns, percentage, progressBar, retangleColumn, _i, _j, _len, _len1, _ref;
          ctx = $scope.context;
          if (!ctx) {
            return;
          }
          loginRetangleColumns = SystemParameters.loginScreen.loginRetangleColumns;
          if (loginRetangleColumns.length === 0) {
            return;
          }
          alphaCtx = $scope.alphaContext;
          betaCtx = $scope.betaContext;
          $scope.clearBetaContext();
          $scope.clearAlphaContext();
          for (_i = 0, _len = loginRetangleColumns.length; _i < _len; _i++) {
            retangleColumn = loginRetangleColumns[_i];
            if (retangleColumn.completed) {
              continue;
            }
            _ref = retangleColumn.cells;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              cell = _ref[_j];
              if (cell.visible) {
                $scope.drawRetangle(cell);
                cellMask = {
                  width: cell.width,
                  height: cell.height,
                  fill: true,
                  fillColor: 'SKYBLUE',
                  strokeColor: 'SKYBLUE',
                  x: cell.x,
                  y: cell.y
                };
                alphaCtx.save();
                $scope.drawRetangle(cellMask, SystemParameters.ALPHACANVAS);
                alphaCtx.restore();
              }
            }
          }
          betaCtx.save();
          betaCtx.drawImage($scope.alphaCanvas, 0, 0);
          betaCtx.restore();
          betaCtx.save();
          betaCtx.globalCompositeOperation = 'destination-in';
          progressBar = SystemParameters.loginScreen.progressBar;
          percentage = ResourceModel.loadPercentage;
          if (percentage < 100) {
            progressBar.width = progressBar.maxWidth * (percentage / 100);
          } else {
            progressBar.width = progressBar.maxWidth;
          }
          $scope.drawRetangle(progressBar, SystemParameters.BETACANVAS);
          betaCtx.restore();
          ctx.save();
          ctx.drawImage($scope.betaCanvas, 0, 0);
          return ctx.restore();
        }
      };
    }
  ]);
});  //# sourceMappingURL=loginscreen.js.map
