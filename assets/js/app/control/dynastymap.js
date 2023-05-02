define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('DynastyMapControl', [
    'EVENT',
    'SystemParameters',
    'ResourceModel',
    function (EVENT, SystemParameters, ResourceModel) {
      return {
        animatingMaps: function ($scope, animationCompletedCallback) {
          var checkChangingMapState, syncNewMapAndCurrentMap, updateCurrentMap, updateNewMap;
          syncNewMapAndCurrentMap = function (callback) {
            if (!ResourceModel.newMap) {
              return;
            }
            if (SystemParameters.changingMapState.changingCurrentMap || SystemParameters.changingMapState.changingNewMap) {
              return;
            }
            ResourceModel.currentMap = {
              dynasty: ResourceModel.newMap.dynasty,
              period: ResourceModel.newMap.period,
              mask: ResourceModel.newMap.mask,
              outline: ResourceModel.newMap.outline,
              contentCircleConfig: ResourceModel.newMap.contentCircleConfig,
              outLineWidth: ResourceModel.newMap.outLineWidth
            };
            ResourceModel.currentMap.contentCircle = {
              x: ResourceModel.newMap.contentCircle.x,
              y: ResourceModel.newMap.contentCircle.y,
              r: ResourceModel.newMap.contentCircle.r,
              fillColor: 'PANELBG',
              strokeColor: 'PANELBG',
              fill: true,
              delay: ResourceModel.newMap.contentCircle.delay
            };
            ResourceModel.currentMap.outlineCircle = {
              x: ResourceModel.newMap.contentCircle.x,
              y: ResourceModel.newMap.contentCircle.y,
              r: ResourceModel.newMap.contentCircle.r + ResourceModel.newMap.outLineWidth,
              fillColor: 'PANELBG',
              strokeColor: 'PANELBG',
              fill: true,
              delay: ResourceModel.newMap.contentCircle.delay
            };
            ResourceModel.newMap = void 0;
            $scope.$emit(EVENT.CHANGING_MAP_COMPLETED);
            if (callback) {
              return callback();
            }
          };
          checkChangingMapState = function () {
            if (SystemParameters.changingMapState.changingNewMap) {
              return;
            }
            if (SystemParameters.changingMapState.changingCurrentMap) {
              return;
            }
            return syncNewMapAndCurrentMap(animationCompletedCallback);
          };
          updateNewMap = function (callback) {
            var changingNewMap, contentCircle, outlineCircle, _ref;
            if (SystemParameters.changingMapState.changingNewMap && ((_ref = ResourceModel.newMap) != null ? _ref.contentCircle : void 0)) {
              contentCircle = ResourceModel.newMap.contentCircle;
              outlineCircle = ResourceModel.newMap.outlineCircle;
              return changingNewMap = new TWEEN.Tween(contentCircle).to({ r: ResourceModel.newMap.contentCircleConfig.endR }, 1000).delay(5).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
                return outlineCircle.r = contentCircle.r + ResourceModel.newMap.outLineWidth;
              }).onComplete(function () {
                changingNewMap = null;
                SystemParameters.changingMapState.changingNewMap = false;
                checkChangingMapState();
                if (callback) {
                  return callback();
                }
              }).start();
            }
          };
          updateCurrentMap = function (callback) {
            var changingCurrentMap, contentCircle, outlineCircle, _ref;
            if (SystemParameters.changingMapState.changingCurrentMap && ((_ref = ResourceModel.currentMap) != null ? _ref.contentCircle : void 0)) {
              contentCircle = ResourceModel.currentMap.contentCircle;
              outlineCircle = ResourceModel.currentMap.outlineCircle;
            } else {
              SystemParameters.changingMapState.changingCurrentMap = false;
              checkChangingMapState();
              return;
            }
            return changingCurrentMap = new TWEEN.Tween(contentCircle).to({ r: ResourceModel.currentMap.contentCircleConfig.startR }, 1000).delay(800).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
              return outlineCircle.r = contentCircle.r + ResourceModel.currentMap.outLineWidth;
            }).onComplete(function () {
              changingCurrentMap = null;
              SystemParameters.changingMapState.changingCurrentMap = false;
              checkChangingMapState();
              if (callback) {
                return callback();
              }
            }).start();
          };
          updateCurrentMap();
          return updateNewMap();
        },
        draw: function ($scope) {
          var alphaCtx, betaCtx, ctx, drawMap, isOutLine, retangle;
          ctx = $scope.context;
          alphaCtx = $scope.alphaContext;
          betaCtx = $scope.betaContext;
          if (!ctx) {
            return;
          }
          if (!alphaCtx) {
            return;
          }
          if (!betaCtx) {
            return;
          }
          drawMap = function (map, outline) {
            var circle, height, image, width, x, y;
            if ((map != null ? map.contentCircle : void 0) != null) {
              if (outline) {
                circle = map.outlineCircle;
                image = map.outline;
              } else {
                circle = map.contentCircle;
                image = map.mask;
              }
              width = SystemParameters.SCREENWIDTH * ResourceModel.currentMapScale / 100;
              height = SystemParameters.SCREENHEIGHT * ResourceModel.currentMapScale / 100;
              x = (SystemParameters.SCREENWIDTH - width) / 2;
              y = (SystemParameters.SCREENHEIGHT - height) / 2;
              alphaCtx.save();
              $scope.clearAlphaContext();
              alphaCtx.drawImage(image.data, x, y, width, height);
              alphaCtx.restore();
              alphaCtx.save();
              alphaCtx.globalCompositeOperation = 'source-atop';
              $scope.drawCircle(circle, SystemParameters.ALPHACANVAS);
              alphaCtx.restore();
              betaCtx.save();
              betaCtx.drawImage($scope.alphaCanvas, 0, 0);
              return betaCtx.restore();
            }
          };
          isOutLine = true;
          betaCtx.save();
          $scope.clearBetaContext();
          drawMap(ResourceModel.currentMap, isOutLine);
          drawMap(ResourceModel.newMap, isOutLine);
          betaCtx.restore();
          alphaCtx.save();
          $scope.clearAlphaContext();
          alphaCtx.drawImage($scope.betaCanvas, 0, 0);
          alphaCtx.restore();
          alphaCtx.save();
          alphaCtx.globalCompositeOperation = 'source-atop';
          retangle = {
            x: 0,
            y: 0,
            width: $scope.alphaCanvas.width,
            height: $scope.alphaCanvas.height,
            strokeColor: 'SKYBLUE',
            strokeAlpha: 0,
            fillColor: 'SKYBLUE',
            fill: true
          };
          $scope.drawRetangle(retangle, SystemParameters.ALPHACANVAS);
          alphaCtx.restore();
          ctx.save();
          ctx.drawImage($scope.alphaCanvas, 0, 0);
          ctx.restore();
          betaCtx.save();
          $scope.clearBetaContext();
          drawMap(ResourceModel.currentMap);
          drawMap(ResourceModel.newMap);
          betaCtx.restore();
          ctx.save();
          ctx.globalCompositeOperation = 'xor';
          ctx.drawImage($scope.betaCanvas, 0, 0);
          ctx.globalAlpha = 0.45;
          ctx.globalCompositeOperation = 'source-over';
          ctx.drawImage($scope.betaCanvas, 0, 0);
          ctx.globalAlpha = 1;
          return ctx.restore();
        },
        changeCurrentMap: function ($scope, callback) {
          var currentDynastyPeriod, dynasty, mapName, mapOutLineName;
          dynasty = ResourceModel.currentDynasty;
          currentDynastyPeriod = ResourceModel.currentDynastyPeriod;
          mapName = dynasty.name + currentDynastyPeriod;
          mapOutLineName = dynasty.name + currentDynastyPeriod + '_outline';
          ResourceModel.newMap = {
            dynasty: dynasty,
            period: currentDynastyPeriod,
            mask: $scope.getImageByName(mapName),
            outline: $scope.getImageByName(mapOutLineName),
            contentCircleConfig: dynasty.mapConfigs[currentDynastyPeriod],
            outLineWidth: 3
          };
          ResourceModel.newMap.contentCircle = {
            x: ResourceModel.newMap.contentCircleConfig.startX,
            y: ResourceModel.newMap.contentCircleConfig.startY,
            r: ResourceModel.newMap.contentCircleConfig.startR,
            strokeColor: 'PANELBG',
            fillColor: 'PANELBG',
            fill: true,
            delay: ResourceModel.newMap.contentCircleConfig.delay
          };
          ResourceModel.newMap.outlineCircle = {
            x: ResourceModel.newMap.contentCircleConfig.startX,
            y: ResourceModel.newMap.contentCircleConfig.startY,
            r: ResourceModel.newMap.contentCircleConfig.startR + ResourceModel.newMap.outLineWidth,
            strokeColor: 'SKYBLUE',
            fillColor: 'SKYBLUE',
            fill: true,
            delay: ResourceModel.newMap.contentCircleConfig.delay
          };
          SystemParameters.changingMapState.changingNewMap = true;
          if (ResourceModel.currentMap) {
            SystemParameters.changingMapState.changingCurrentMap = true;
          } else {
            SystemParameters.changingMapState.changingCurrentMap = false;
          }
          if (callback) {
            return callback();
          }
        }
      };
    }
  ]);
});  //# sourceMappingURL=dynastymap.js.map
