define([
  'angular',
  'appmodule',
  'angular_resource',
  'threejs',
  'stats',
  'tweenjs'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('EarthControl', [
    'EVENT',
    'SystemParameters',
    'EarthModel',
    'ResourceModel',
    function (EVENT, SystemParameters, EarthModel, ResourceModel) {
      return {
        init: function ($scope) {
          var camera, clouds, createClouds, createSphere, createStars, earth, height, light, radius, renderer, rotation, scene, segments, shapeEarth, stars, width;
          if (!$scope.earthContainer) {
            return;
          }
          if (EarthModel.scene) {
            return;
          }
          width = SystemParameters.SCREENWIDTH;
          height = SystemParameters.SCREENHEIGHT;
          radius = 0.67;
          segments = 64;
          rotation = 6;
          scene = EarthModel.scene = new THREE.Scene();
          camera = EarthModel.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 100);
          renderer = EarthModel.renderer = new THREE.WebGLRenderer();
          createSphere = function (radius, segments) {
            return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshPhongMaterial({
              map: THREE.ImageUtils.loadTexture(ResourceModel.earthTextures.map.src),
              bumpMap: THREE.ImageUtils.loadTexture(ResourceModel.earthTextures.bumpMap.src),
              bumpScale: 0,
              specularMap: THREE.ImageUtils.loadTexture(ResourceModel.earthTextures.specularMap.src),
              specular: new THREE.Color('grey')
            }));
          };
          createClouds = function (radius, segments) {
            return new THREE.Mesh(new THREE.SphereGeometry(radius + 0.003, segments, segments), new THREE.MeshPhongMaterial({
              map: THREE.ImageUtils.loadTexture(ResourceModel.earthTextures.clouds.src),
              transparent: true
            }));
          };
          createStars = function (radius, segments) {
            return new THREE.Mesh(new THREE.SphereGeometry(radius, segments, segments), new THREE.MeshBasicMaterial({
              map: THREE.ImageUtils.loadTexture(ResourceModel.earthTextures.stars.src),
              side: THREE.BackSide
            }));
          };
          EarthModel.controls = new THREE.TrackballControls(EarthModel.camera);
          renderer.setSize(width, height);
          camera.position.z = 1.5;
          scene.add(new THREE.AmbientLight(3355443));
          light = new THREE.DirectionalLight(16777215, 1);
          light.position.set(5, 3, 5);
          scene.add(light);
          earth = createSphere(radius, segments);
          earth.rotation.y = rotation;
          scene.add(earth);
          clouds = createClouds(radius, segments);
          clouds.rotation.y = rotation;
          scene.add(clouds);
          stars = createStars(90, 64);
          scene.add(stars);
          EarthModel.light = light;
          EarthModel.earth = earth;
          EarthModel.clouds = clouds;
          EarthModel.stars = stars;
          $scope.earthContainer.appendChild(renderer.domElement);
          EarthModel.earth.position.x -= 0.01;
          EarthModel.clouds.position.x -= 0.01;
          EarthModel.earth.rotation.y += 9.3;
          EarthModel.earth.rotation.x += 0.62;
          EarthModel.earth.rotation.z += 0.1;
          EarthModel.origin = {
            rotation: {
              x: EarthModel.earth.rotation.x,
              y: EarthModel.earth.rotation.y,
              z: EarthModel.earth.rotation.z
            },
            up: { z: EarthModel.earth.up.z }
          };
          camera.position.z = 1.2;
          shapeEarth = function (direction) {
            if (direction == null) {
              direction = 1;
            }
            EarthModel.shapeEarthTween = null;
            return EarthModel.shapeEarthTween = new TWEEN.Tween({
              px: EarthModel.earth.rotation.x,
              pz: EarthModel.earth.rotation.z,
              rz: EarthModel.earth.up.z
            }).to({
              px: EarthModel.origin.rotation.x + (Math.random() * 10 + 1) * 0.0003 * direction,
              pz: EarthModel.origin.rotation.z + (Math.random() * 10 + 1) * 0.0003 * direction,
              rz: EarthModel.origin.up.z + (Math.random() * 10 + 1) * 0.003 * direction
            }, 5500).delay(10).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
              EarthModel.earth.rotation.x = this.px;
              EarthModel.earth.rotation.z = this.pz;
              EarthModel.earth.up.z = this.rz;
              EarthModel.clouds.rotation.x = this.px;
              EarthModel.clouds.rotation.z = this.pz;
              return EarthModel.clouds.up.z = this.rz;
            }).onComplete(function () {
              return shapeEarth(direction * -1);
            }).start();
          };
          return shapeEarth();
        },
        update: function () {
          return EarthModel.clouds.rotation.y += 0.00001;
        },
        draw: function () {
          if (!EarthModel.renderer) {
            return;
          }
          return EarthModel.renderer.render(EarthModel.scene, EarthModel.camera);
        },
        updateCameraZ: function (newZ) {
          return EarthModel.camera.position.z = newZ;
        },
        relocateCamera: function (callback) {
          var animateCameraPosition, camera, delay, timeOut;
          camera = EarthModel.camera;
          timeOut = 2000;
          delay = 500;
          return animateCameraPosition = new TWEEN.Tween({ pz: camera.position.z }).to({ pz: 1.5 }, timeOut).delay(delay).easing(TWEEN.Easing.Quadratic.InOut).onUpdate(function () {
            return camera.position.z = this.pz;
          }).onComplete(function () {
            ResourceModel.loginAnimationCompleted = true;
            if (callback) {
              return callback();
            }
          }).start();
        }
      };
    }
  ]);
});  //# sourceMappingURL=earth.js.map
