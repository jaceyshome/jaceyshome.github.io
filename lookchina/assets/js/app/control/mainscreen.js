define([
  'SoundManager',
  'angular',
  'appmodule',
  'browserdetect'
], function (SoundManager) {
  var appModule;
  appModule = angular.module('app');
  return appModule.controller('MainScreenCtrl', [
    '$scope',
    'EVENT',
    'CSV',
    'SystemParameters',
    'ResourceModel',
    'EarthModel',
    'PreloadDataService',
    'LoginScreenControl',
    'DynastyIntroAudioControl',
    'EarthControl',
    'NavigationPanelControl',
    'TimelinePanelControl',
    'CategoryPanelControl',
    'DynastyMapControl',
    'MapAreaPanelControl',
    'ShowingPanelsControl',
    'MaximizedPanelControl',
    function ($scope, EVENT, CSV, SystemParameters, ResourceModel, EarthModel, PreloadDataService, LoginScreenControl, DynastyIntroAudioControl, EarthControl, NavigationPanelControl, TimelinePanelControl, CategoryPanelControl, DynastyMapControl, MapAreaPanelControl, ShowingPanelsControl, MaximizedPanelControl) {
      var addShowingPanel, animate, bgSounds, init, onLoginFadeOutComplete, onMouseMove, onload, registerCanvasEvent, resetMapCamera, update, updateEqData, updateMapCamera;
      bgSounds = SystemParameters.bgSounds;
      $scope.context = void 0;
      $scope.canvas = void 0;
      $scope.mainScreen = null;
      $scope.mainScreen = angular.element('#mainScreen');
      $scope.earthContainer = angular.element('#earthContainer');
      $scope.loadDataComplete = false;
      $scope.currentDynasty = ResourceModel.currentDynasty;
      $scope.showingVideoResources = [];
      $scope.soudManagerReady = false;
      $scope.eqData = void 0;
      $scope.bgSoundOn = true;
      $scope.bg3DearthOn = true;
      $scope.alphaCanvas = false;
      $scope.betaCanvas = false;
      $scope.eqData = [];
      init = function () {
        $scope.ResourceModel = ResourceModel;
        SoundManager.init(updateEqData);
        return LoginScreenControl.init();
      };
      updateEqData = function (eqData) {
        return $scope.eqData = eqData;
      };
      $scope.$watch('earthContainer', function (e) {
        if ($scope.bg3DearthOn) {
          if (e !== void 0) {
            return $scope.earthContainer = document.getElementById('earthContainer');
          }
        }
      });
      $scope.$watch('mainScreen', function (e) {
        if (e !== void 0 && $scope.earthContainer) {
          $scope.canvas = document.getElementById('mainScreen');
          if ($scope.canvas) {
            SystemParameters.canvas = $scope.canvas;
            registerCanvasEvent();
            window.onload();
            return PreloadDataService.preloadData(function () {
              setTimeout(function () {
                $scope.loadDataComplete = true;
                return EarthControl.init($scope);
              }, 1000);
              return init();
            });
          }
        }
      });
      onMouseMove = function (e) {
        var data, hitspot;
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
      };
      registerCanvasEvent = function () {
        $scope.canvas.onmousedown = function (e) {
          if (!SystemParameters.onPlayingAnimation) {
            e.preventDefault();
            return TimelinePanelControl.handleMouseDown(e, $scope);
          }
        };
        $scope.canvas.onmousemove = function (e) {
          if (!SystemParameters.onPlayingAnimation) {
            e.preventDefault();
            onMouseMove(e);
            return TimelinePanelControl.handleMouseMove(e, $scope);
          }
        };
        return $scope.canvas.onmouseup = function (e) {
          if (!SystemParameters.onPlayingAnimation) {
            e.preventDefault();
            CategoryPanelControl.handleMouseUp(e, $scope);
            TimelinePanelControl.handleMouseUp(e, $scope);
            NavigationPanelControl.handleMouseUp(e, $scope);
            return MapAreaPanelControl.handleMouseUp(e, $scope);
          }
        };
      };
      onLoginFadeOutComplete = function () {
        EarthControl.relocateCamera(function () {
          return $scope.$emit(EVENT.ON_CHANGE_CURRENT_DYNASTY, {
            dynastyId: 9,
            height: 26,
            periodId: 0,
            width: 26,
            x: 506,
            y: 620
          });
        });
        return SoundManager.playBgSound(bgSounds, 0, updateEqData);
      };
      window.requestAnimFrame = function (callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
          return window.setTimeout(callback, 1000 / 24);
        };
      };
      window.onload = function () {
        onload();
        return animate();
      };
      onload = function () {
        $scope.alphaCanvas = document.getElementById('alphaCanvas');
        $scope.alphaContext = $scope.alphaCanvas.getContext('2d');
        $scope.betaCanvas = document.getElementById('betaCanvas');
        $scope.betaContext = $scope.betaCanvas.getContext('2d');
        $scope.context = $scope.canvas.getContext('2d');
        return SystemParameters.context = $scope.context;
      };
      animate = function () {
        update();
        TWEEN.update();
        return window.requestAnimationFrame(animate);
      };
      update = function () {
        $scope.context.clearRect(0, 0, $scope.canvas.width, $scope.canvas.height);
        if ($scope.loadDataComplete) {
          EarthControl.update();
          EarthControl.draw();
        }
        LoginScreenControl.drawCover($scope);
        if (!SystemParameters.loginScreen.isCoverFadeOut && $scope.loadDataComplete) {
          LoginScreenControl.fadeOutColumnCells(onLoginFadeOutComplete);
        }
        if (ResourceModel.loginAnimationCompleted) {
          DynastyMapControl.draw($scope);
          NavigationPanelControl.update($scope);
          NavigationPanelControl.draw($scope);
          CategoryPanelControl.draw($scope);
          TimelinePanelControl.draw($scope);
          MapAreaPanelControl.draw($scope);
          return DynastyIntroAudioControl.draw($scope);
        }
      };
      $scope.clearAlphaContext = function () {
        if (!$scope.alphaContext) {
          return;
        }
        return $scope.alphaContext.clearRect(0, 0, $scope.alphaCanvas.width, $scope.alphaCanvas.height);
      };
      $scope.clearBetaContext = function () {
        if (!$scope.betaContext) {
          return;
        }
        return $scope.betaContext.clearRect(0, 0, $scope.betaCanvas.width, $scope.betaCanvas.height);
      };
      $scope.getColor = function (name, alpha) {
        var color, colorCode;
        colorCode = SystemParameters.colors[name];
        if (!alpha) {
          alpha = 1;
        }
        color = 'rgba(' + colorCode + ',' + alpha + ')';
        return color;
      };
      $scope.getFont = function (text) {
        var fontFamily, fontSize, fontWeight;
        if (text.fontFamily) {
          fontFamily = text.fontFamily;
        } else {
          fontFamily = 'DEFAULT';
        }
        if (text.fontSize) {
          fontSize = text.fontSize;
        } else {
          fontSize = 'MIDDLE';
        }
        if (text.fontWeight) {
          fontWeight = text.fontWeight;
        } else {
          fontWeight = 'normal';
        }
        fontFamily = SystemParameters.fontFamily[fontFamily];
        fontSize = SystemParameters.fontSize[fontSize];
        return fontWeight + ' ' + fontSize + ' ' + fontFamily;
      };
      $scope.loadImageData = function (image, callback) {
        return;
        if (!image.data) {
          image.data = new Image();
          image.data.onload = function () {
            if (this.complete) {
              callback();
              return image;
            }
          };
          return image.data.src = image.url;
        }
      };
      $scope.getImageByName = function (name) {
        var image, _i, _len, _ref;
        _ref = SystemParameters.images;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          image = _ref[_i];
          if (image.name.split('.')[0] === name) {
            return image;
          }
        }
      };
      $scope.drawParagraph = function (text) {
        var ctx, drawLine, lineHeight, lineWidth, lineWidthOffset, n, textLine, words, _i, _ref, _results;
        ctx = $scope.context;
        words = text.text.split(' ');
        if (text.lineHeight) {
          lineHeight = text.lineHeight;
        } else {
          lineHeight = 12;
        }
        if (text.lineWidthOffset) {
          lineWidthOffset = text.lineWidthOffset;
        } else {
          lineWidthOffset = 0;
        }
        textLine = {
          text: '',
          x: text.x,
          y: text.y,
          color: text.color,
          textAlign: text.textAlign,
          textBaseline: text.textBaseline,
          fontWeight: text.fontWeight,
          fontFamily: text.fontFamily,
          fontSize: text.fontSize
        };
        _results = [];
        for (n = _i = 0, _ref = words.length - 1; _i <= _ref; n = _i += 1) {
          textLine.text += words[n] + ' ';
          lineWidth = ctx.measureText(textLine.text).width;
          drawLine = function () {
            $scope.drawText(textLine);
            textLine.y += lineHeight;
            return textLine.text = '';
          };
          if (lineWidth >= text.width - lineWidthOffset && n > 0) {
            drawLine();
          }
          if (n >= words.length - 1) {
            _results.push(drawLine());
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      $scope.drawText = function (text) {
        var alpha, color, ctx, x, y;
        ctx = $scope.context;
        if (!ctx) {
          return;
        }
        ctx.save();
        x = text.x;
        y = text.y;
        if (text.color) {
          color = text.color;
        } else {
          color = 'WHITE';
        }
        ctx.font = $scope.getFont(text);
        if (text.textAlign) {
          ctx.textAlign = text.textAlign;
        }
        if (text.textBaseline) {
          ctx.textBaseline = text.textBaseline;
        }
        if (text.alpha !== void 0) {
          alpha = text.alpha;
        } else {
          alpha = 1;
        }
        if (text.shadow) {
          ctx.shadowColor = $scope.getColor(text.shadow.color, text.shadow.alpha);
          ctx.shadowOffsetX = text.shadow.offsetX;
          ctx.shadowOffsetY = text.shadow.offsetY;
          ctx.shadowBlur = text.shadow.blur;
        }
        ctx.fillStyle = $scope.getColor(color, alpha);
        ctx.fillText(text.text, x, y);
        ctx.restore();
        return ctx.measureText(text.text).width;
      };
      $scope.drawMapIcon = function (icon) {
        if (SystemParameters.onMapChangingAnimation) {
          return;
        }
        if (!icon.alpha) {
          icon.alpha = 0;
        }
        return $scope.drawImage(icon);
      };
      $scope.drawImage = function (image, canvasName) {
        var alpha, ctx, height, width;
        if (canvasName === SystemParameters.MAINCANVAS) {
          ctx = $scope.context;
        } else if (canvasName === SystemParameters.ALPHACANVAS) {
          ctx = $scope.alphaContext;
        } else if (canvasName === SystemParameters.BETACANVAS) {
          ctx = $scope.betaContext;
        } else {
          ctx = $scope.context;
        }
        if (!ctx) {
          return;
        }
        if (image.width) {
          width = image.width;
        } else {
          width = image.data.width;
        }
        if (image.height) {
          height = image.height;
        } else {
          height = image.data.height;
        }
        if (image.alpha) {
          alpha = image.alpha;
        } else {
          alpha = 1;
        }
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.drawImage(image.data, image.x, image.y, width, height);
        ctx.globalAlpha = 1;
        return ctx.restore();
      };
      $scope.drawCSVImage = function (image) {
        var ctx;
        ctx = $scope.context;
        if (!ctx) {
          return;
        }
        ctx.save();
        ctx.drawSvg(image.data.src, image.x, image.y, image.width, image.height);
        return ctx.restore();
      };
      $scope.drawVideoPanel = function (videoPanel) {
        var ctx;
        if (!videoPanel || !videoPanel.video || videoPanel.video.ended) {
          return;
        }
        ctx = $scope.context;
        ctx.save();
        ctx.drawImage(videoPanel.video, videoPanel.x, videoPanel.y, videoPanel.width, videoPanel.height);
        return ctx.restore();
      };
      $scope.drawRetangle = function (retangle, canvasName) {
        var ctx, fillAlpha, fillColor, height, lineWidth, radius, strokeAlpha, strokeColor, width, x, y;
        if (canvasName === SystemParameters.MAINCANVAS) {
          ctx = $scope.context;
        } else if (canvasName === SystemParameters.ALPHACANVAS) {
          ctx = $scope.alphaContext;
        } else if (canvasName === SystemParameters.BETACANVAS) {
          ctx = $scope.betaContext;
        } else {
          ctx = $scope.context;
        }
        if (!ctx) {
          return;
        }
        ctx.save();
        x = retangle.x;
        y = retangle.y;
        width = retangle.width;
        height = retangle.height;
        if (retangle.radius) {
          radius = retangle.radius;
        } else {
          radius = 0;
        }
        if (retangle.strokeColor) {
          strokeColor = retangle.strokeColor;
        } else {
          strokeColor = 'WHITE';
        }
        if (retangle.lineWidth) {
          lineWidth = retangle.lineWidth;
        } else {
          lineWidth = 1;
        }
        if (retangle.fillAlpha !== void 0) {
          fillAlpha = retangle.fillAlpha;
        } else {
          fillAlpha = 1;
        }
        if (retangle.strokeAlpha !== void 0) {
          strokeAlpha = retangle.strokeAlpha;
        } else {
          strokeAlpha = 1;
        }
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.strokeStyle = $scope.getColor(strokeColor, strokeAlpha);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        if (retangle.fill) {
          if (retangle.fillColor) {
            fillColor = retangle.fillColor;
          } else {
            fillColor = 'WHITE';
          }
          ctx.fillStyle = $scope.getColor(fillColor, fillAlpha);
          ctx.fillRect(x, y, width, height);
        }
        return ctx.restore();
      };
      $scope.drawPolygon = function (polygon) {
        var ctx, fillColor, i, lineWidth, points, strokeColor, _i, _ref;
        if (polygon.strokeColor) {
          strokeColor = polygon.strokeColor;
        } else {
          strokeColor = 'WHITE';
        }
        if (polygon.lineWidth) {
          lineWidth = polygon.lineWidth;
        } else {
          lineWidth = 1;
        }
        points = polygon.points;
        ctx = $scope.context;
        ctx.save();
        ctx.beginPath();
        for (i = _i = 0, _ref = points.length - 1; _i <= _ref; i = _i += 1) {
          if (i === 0) {
            ctx.moveTo(points[i].x, points[i].y);
          } else {
            ctx.lineTo(points[i].x, points[i].y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = $scope.getColor(strokeColor);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        if (polygon.fill) {
          if (polygon.fillColor) {
            fillColor = polygon.fillColor;
          } else {
            fillColor = 'WHITE';
          }
          ctx.fillStyle = $scope.getColor(fillColor);
          ctx.fill();
        }
        return ctx.restore();
      };
      $scope.drawCircle = function (circle, canvasName) {
        var ctx, fillColor, lineWidth, r, strokeColor, x, y;
        if (canvasName === SystemParameters.MAINCANVAS) {
          ctx = $scope.context;
        } else if (canvasName === SystemParameters.ALPHACANVAS) {
          ctx = $scope.alphaContext;
        } else if (canvasName === SystemParameters.BETACANVAS) {
          ctx = $scope.betaContext;
        } else {
          ctx = $scope.context;
        }
        if (!ctx) {
          return;
        }
        ctx.save();
        x = circle.x;
        y = circle.y;
        r = circle.r;
        if (circle.lineWidth) {
          lineWidth = circle.lineWidth;
        } else {
          lineWidth = 1;
        }
        if (circle.strokeColor) {
          strokeColor = circle.strokeColor;
        } else {
          strokeColor = 'WHITE';
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 2 * Math.PI, false);
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        if (circle.fill) {
          if (circle.fillColor) {
            fillColor = circle.fillColor;
          } else {
            fillColor = 'WHITE';
          }
          ctx.fillStyle = $scope.getColor(fillColor);
          ctx.fill();
        }
        return ctx.restore();
      };
      $scope.drawLine = function (line) {
        var ctx, lineWidth, strokeColor;
        ctx = $scope.context;
        ctx.save();
        if (line.lineWidth) {
          lineWidth = line.lineWidth;
        } else {
          lineWidth = 1;
        }
        if (line.strokeColor) {
          strokeColor = line.strokeColor;
        } else {
          strokeColor = 'WHITE';
        }
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(line.endX, line.endY);
        ctx.closePath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = $scope.getColor(strokeColor);
        ctx.stroke();
        return ctx.restore();
      };
      $scope.drawPanelButton = function (button) {
        var ctx;
        if (button.visible === false) {
          return;
        }
        ctx = $scope.context;
        ctx.save();
        $scope.drawImage(button);
        return ctx.restore();
      };
      $scope.createRetangleMask = function (retangle) {
        var ctx, height, width, x, y;
        if (!retangle) {
          return;
        }
        ctx = $scope.context;
        ctx.save();
        x = retangle.x;
        y = retangle.y;
        width = retangle.width;
        height = retangle.height;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.closePath();
        return ctx.clip();
      };
      $scope.endMask = function () {
        var ctx;
        ctx = $scope.context;
        if (!ctx) {
          return;
        }
        return ctx.restore();
      };
      $scope.loadImageData = function (image, callback) {
        image.data = new Image();
        image.data.onload = function () {
          if (this.complete) {
            if (callback) {
              return callback();
            }
          }
        };
        return image.data.src = image.url;
      };
      $scope.checkMouseAndHitspotCollision = function (e, hitspot) {
        var mouse, mouseX, mouseY;
        if (!hitspot) {
          return;
        }
        mouse = $scope.getMousePosition(e);
        mouseX = mouse.x;
        mouseY = mouse.y;
        if (mouseX >= hitspot.x && mouseX <= hitspot.x + hitspot.width) {
          if (mouseY >= hitspot.y && mouseY <= hitspot.y + hitspot.height) {
            return true;
          }
        }
        return false;
      };
      $scope.getMousePosition = function (e) {
        var bbox, mouse;
        if (!$scope.canvas) {
          return;
        }
        bbox = $scope.canvas.getBoundingClientRect();
        mouse = {
          x: e.clientX - bbox.left * ($scope.canvas.width / bbox.width),
          y: e.clientY - bbox.top * ($scope.canvas.height / bbox.height)
        };
        return mouse;
      };
      addShowingPanel = function (newPanel) {
        newPanel.editDateTime = Date.now();
        return ResourceModel.showingPanels.push(newPanel);
      };
      resetMapCamera = function (callback) {
        var currentDynastyPeriod, data, resetCameraPosition;
        if (!ResourceModel.currentDynasty) {
          if (callback) {
            callback();
          }
          return;
        }
        currentDynastyPeriod = ResourceModel.currentDynastyPeriod;
        data = {
          scale: ResourceModel.currentDynasty.mapConfigs[currentDynastyPeriod].scale,
          mapZ: ResourceModel.currentDynasty.mapConfigs[currentDynastyPeriod].mapZ
        };
        return resetCameraPosition = new TWEEN.Tween(data).to({
          scale: SystemParameters.SCALE,
          mapZ: SystemParameters.MAP_Z
        }, 500).delay(10).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
          EarthControl.updateCameraZ(data.mapZ);
          return ResourceModel.currentMapScale = data.scale;
        }).onComplete(function () {
          resetCameraPosition = null;
          if (callback) {
            return callback();
          }
        }).start();
      };
      updateMapCamera = function (callback) {
        var currentDynastyPeriod, data, newCameraPosition;
        if (!ResourceModel.currentDynasty) {
          if (callback) {
            callback();
          }
          return;
        }
        currentDynastyPeriod = ResourceModel.currentDynastyPeriod;
        data = {
          scale: ResourceModel.currentMapScale,
          mapZ: EarthModel.camera.position.z
        };
        if (data.scale === ResourceModel.currentDynasty.mapConfigs[currentDynastyPeriod].scale) {
          if (callback) {
            callback();
          }
          return;
        }
        return newCameraPosition = new TWEEN.Tween(data).to({
          scale: ResourceModel.currentDynasty.mapConfigs[currentDynastyPeriod].scale,
          mapZ: ResourceModel.currentDynasty.mapConfigs[currentDynastyPeriod].mapZ
        }, 500).delay(10).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
          EarthControl.updateCameraZ(data.mapZ);
          return ResourceModel.currentMapScale = data.scale;
        }).onComplete(function () {
          newCameraPosition = null;
          if (callback) {
            return callback();
          }
        }).start();
      };
      $scope.$on(EVENT.PLAY_DYNASTY_INTRO_AUDIO, function (e, introAudio) {
        var onFinishCallback, onPlayingCallback;
        e.preventDefault();
        ResourceModel.currentIntroAudio = introAudio;
        onPlayingCallback = function () {
          return void 0;
        };
        onFinishCallback = function () {
          var nextIntroIndex;
          if (!ResourceModel.currentDynasty.introAudios) {
            return;
          }
          introAudio.state = SystemParameters.introAudioState.COMPLETED;
          nextIntroIndex = ResourceModel.currentIntroAudio.id + 1;
          if (nextIntroIndex < ResourceModel.currentDynasty.introAudios.length) {
            ResourceModel.currentIntroAudio = ResourceModel.currentDynasty.introAudios[nextIntroIndex];
            SoundManager.playIntroAudio(ResourceModel.currentIntroAudio, onPlayingCallback, onFinishCallback);
            return DynastyIntroAudioControl.fadeInText();
          } else {
            ResourceModel.currentIntroAudio = void 0;
            return ResourceModel.drawingIntroText = void 0;
          }
        };
        SoundManager.playIntroAudio(introAudio, onPlayingCallback, onFinishCallback);
        return DynastyIntroAudioControl.fadeInText();
      });
      $scope.$on(EVENT.COMPLETE_DYNASTY_INTRO_AUDIO, function (e, introAudio) {
        return e.preventDefault();
      });
      $scope.$on(EVENT.STOP_CURRENT_INTRO_AUDIO, function (e) {
        e.preventDefault();
        return SoundManager.stopIntroAudio(ResourceModel.currentIntroAudio);
      });
      $scope.$on(EVENT.ON_CHANGE_CURRENT_DYNASTY, function (e, hitspot) {
        e.preventDefault();
        $scope.$emit(EVENT.CLEAR_SHOWING_PANELS);
        return $scope.$emit(EVENT.ICONS_FADE_OUT, function () {
          var callback, currentMapConfig, dynasty, newMapConfig, _i, _len, _ref;
          $scope.$emit(EVENT.ON_AINIMATION_PLAYING);
          SystemParameters.onMapChangingAnimation = true;
          callback = function () {
            var changingDynasty, dynasty, _i, _len, _ref;
            changingDynasty = ResourceModel.currentDynastyId !== hitspot.dynastyId || !ResourceModel.currentDynastyId;
            ResourceModel.currentDynastyId = hitspot.dynastyId;
            ResourceModel.currentDynastyPeriod = hitspot.periodId;
            _ref = ResourceModel.dynasties;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              dynasty = _ref[_i];
              if (dynasty.id === ResourceModel.currentDynastyId) {
                ResourceModel.currentDynasty = dynasty;
                if (changingDynasty) {
                  if (ResourceModel.currentIntroAudio) {
                    SoundManager.stopIntroAudio(ResourceModel.currentIntroAudio);
                    ResourceModel.currentIntroAudio = void 0;
                    ResourceModel.drawingIntroText = void 0;
                  }
                  DynastyIntroAudioControl.load($scope);
                }
                break;
              }
            }
            DynastyMapControl.changeCurrentMap($scope, function () {
              return DynastyMapControl.animatingMaps($scope, function () {
                return SystemParameters.onMapChangingAnimation = false;
              });
            });
            return NavigationPanelControl.changeCurrentDynasty();
          };
          if (ResourceModel.currentDynasty) {
            currentMapConfig = ResourceModel.currentDynasty.mapConfigs[ResourceModel.currentDynastyPeriod];
            _ref = ResourceModel.dynasties;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              dynasty = _ref[_i];
              if (dynasty.id === hitspot.dynastyId) {
                newMapConfig = dynasty.mapConfigs[hitspot.periodId];
                break;
              }
            }
            if (currentMapConfig.mapZ === newMapConfig.mapZ) {
              callback();
              return;
            }
          }
          return resetMapCamera(callback);
        });
      });
      $scope.$on(EVENT.ICONS_FADE_OUT, function (e, callback) {
        e.preventDefault();
        return MapAreaPanelControl.iconsFadeOut(callback);
      });
      $scope.$on(EVENT.ICONS_FADE_IN, function (e, callback) {
        e.preventDefault();
        return MapAreaPanelControl.iconsFadeIn($scope, callback);
      });
      $scope.$on(EVENT.CLEAR_SHOWING_PANELS, function (e) {
        var container, showingPanel, showingPanelContainers, showingPanels, _i, _j, _len, _len1;
        e.preventDefault();
        ResourceModel.isShowingMaximizedPanel = false;
        showingPanels = ResourceModel.showingPanels;
        for (_i = 0, _len = showingPanels.length; _i < _len; _i++) {
          showingPanel = showingPanels[_i];
          showingPanel.resource.isShowing = false;
        }
        ResourceModel.showingPanels = null;
        ResourceModel.showingPanels = [];
        ResourceModel.showingMaximizedPanel = null;
        showingPanelContainers = SystemParameters.panelSettings.showingPanelContainers;
        for (_j = 0, _len1 = showingPanelContainers.length; _j < _len1; _j++) {
          container = showingPanelContainers[_j];
          container.panel = void 0;
        }
        return $scope.$apply(ResourceModel.showingPanels);
      });
      $scope.$on(EVENT.REMOVE_SHOWING_PANEL, function (e, data) {
        var container, panel, _i, _len, _ref;
        e.preventDefault();
        if (!data.panel) {
          return;
        }
        if (data.panelContainer) {
          data.panelContainer.panel = void 0;
        } else {
          _ref = SystemParameters.panelSettings.showingPanelContainers;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            container = _ref[_i];
            if (container.panel === data.panel) {
              container.panel = void 0;
              break;
            }
          }
        }
        panel = data.panel;
        panel.resource.isShowing = false;
        ResourceModel.showingPanels.splice(ResourceModel.showingPanels.indexOf(panel), 1);
        panel = void 0;
        $scope.$apply(ResourceModel.showingPanels);
        if (data.callback) {
          return data.callback();
        }
      });
      $scope.$on(EVENT.ADD_SHOWING_PANEL, function (e, newPanel) {
        e.preventDefault();
        ResourceModel.isShowingMaximizedPanel = false;
        newPanel.resource.isShowing = true;
        addShowingPanel(newPanel);
        return $scope.$apply(ResourceModel.showingPanels);
      });
      $scope.$on(EVENT.MAXIMIZE_TEXT_PANEL, function (e, panel) {
        e.preventDefault();
        ResourceModel.isShowingMaximizedPanel = true;
        $scope.$emit(EVENT.PAUSE_ALL_SHOWING_VIDEO_PANEL);
        return MaximizedPanelControl.creatingMaximizedTextPanel($scope, panel, function () {
        });
      });
      $scope.$on(EVENT.MAXIMIZE_IMAGE_PANEL, function (e, panel) {
        e.preventDefault();
        ResourceModel.isShowingMaximizedPanel = true;
        $scope.$emit(EVENT.PAUSE_ALL_SHOWING_VIDEO_PANEL);
        return MaximizedPanelControl.creatingMaximizedImagePanel($scope, panel, function () {
        });
      });
      $scope.$on(EVENT.MAXIMIZE_VIDEO_PANEL, function (e, panel) {
        e.preventDefault();
        ResourceModel.isShowingMaximizedPanel = true;
        $scope.$emit(EVENT.PAUSE_ALL_SHOWING_VIDEO_PANEL);
        return MaximizedPanelControl.creatingMaximizedVideoPanel($scope, panel, function () {
          return panel.video.play();
        });
      });
      $scope.$on(EVENT.REMOVE_SHOWING_MAXIMAIZE_PANEL, function (e, data) {
        e.preventDefault();
        ResourceModel.isShowingMaximizedPanel = false;
        ResourceModel.showingMaximizedPanel = void 0;
        return $scope.$emit(EVENT.PLAY_ALL_SHOWING_VIDEO_PANEL);
      });
      $scope.$on(EVENT.PAUSE_ALL_SHOWING_VIDEO_PANEL, function (e) {
        e.preventDefault();
        return ShowingPanelsControl.pauseAllPlayingVideo();
      });
      $scope.$on(EVENT.PLAY_ALL_SHOWING_VIDEO_PANEL, function (e) {
        e.preventDefault();
        return ShowingPanelsControl.playAllPausedVideo();
      });
      $scope.$on(EVENT.ON_AINIMATION_PLAYING, function (e) {
        e.preventDefault();
        return SystemParameters.onPlayingAnimation = true;
      });
      $scope.$on(EVENT.ON_AINIMATION_COMPLETED, function (e) {
        e.preventDefault();
        SystemParameters.onPlayingAnimation = false;
        return $scope.$emit(EVENT.ICONS_FADE_IN);
      });
      $scope.$on(EVENT.UPDATE_POINTER_POSITION, function (e, data) {
        e.preventDefault();
        return NavigationPanelControl.updateLocation(data);
      });
      return $scope.$on(EVENT.CHANGING_MAP_COMPLETED, function (e, data) {
        e.preventDefault();
        return updateMapCamera(function () {
          return $scope.$emit(EVENT.ON_AINIMATION_COMPLETED);
        });
      });
    }
  ]);
});  //# sourceMappingURL=mainscreen.js.map
