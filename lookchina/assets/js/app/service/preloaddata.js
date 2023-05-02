define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('PreloadDataService', [
    'SystemParameters',
    'ResourceModel',
    'CSV',
    '$http',
    function (SystemParameters, ResourceModel, CSV, $http) {
      var callback, checkAllPreload, loadCSV, loadEarthTextures, loadImages, loadJson, loadJsons, loadPercentage, loadResourceCategoriesIcons, service;
      loadPercentage = 0;
      callback = null;
      checkAllPreload = function (percentage) {
        loadPercentage += percentage;
        ResourceModel.loadPercentage = loadPercentage;
        if (loadPercentage >= 125) {
          if (callback) {
            return callback();
          }
        }
      };
      loadJson = function (file, callback) {
        return $http.get(file).success(function (data) {
          if (callback) {
            return callback(data);
          }
        });
      };
      loadJsons = function () {
        var categoriesFile, dynastiesFile, loadDynastiesCompleted, loadResourceTypes, loadResourcecCategories, resourcetypesFile;
        dynastiesFile = 'assets/data/jsons/dynasties.json';
        categoriesFile = 'assets/data/jsons/categories.json';
        resourcetypesFile = 'assets/data/jsons/resourcetypes.json';
        loadDynastiesCompleted = function (data) {
          ResourceModel.dynasties = data;
          return checkAllPreload(20);
        };
        loadResourcecCategories = function (data) {
          ResourceModel.resourceCategories = data;
          return checkAllPreload(5);
        };
        loadResourceTypes = function (data) {
          ResourceModel.resourceTypes = data;
          return checkAllPreload(5);
        };
        loadJson(dynastiesFile, loadDynastiesCompleted);
        loadJson(categoriesFile, loadResourcecCategories);
        return loadJson(resourcetypesFile, loadResourceTypes);
      };
      loadImages = function () {
        loadEarthTextures();
        return loadResourceCategoriesIcons();
      };
      loadResourceCategoriesIcons = function () {
        var category, image, _i, _len, _ref, _results;
        if (!(ResourceModel != null ? ResourceModel.resourceCategoryIcons : void 0)) {
          ResourceModel.resourceCategoryIcons = [];
          if (ResourceModel.resourceCategories) {
            _ref = ResourceModel.resourceCategories;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              category = _ref[_i];
              if (category.iconName) {
                image = {};
                image.data = new Image();
                image.data.onload = function () {
                  if (this.complete) {
                    return checkAllPreload(1);
                  }
                };
                image.data.src = 'assets/images/' + category.iconName + '.png';
                _results.push(ResourceModel.resourceCategoryIcons[category.iconName] = image);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        }
      };
      loadEarthTextures = function () {
        var image, images, _i, _len, _results;
        images = [
          {
            name: 'map',
            src: 'assets/images/2_no_clouds_4k.jpg'
          },
          {
            name: 'bumpMap',
            src: 'assets/images/elev_bump_4k.jpg'
          },
          {
            name: 'specularMap',
            src: 'assets/images/water_4k.png'
          },
          {
            name: 'clouds',
            src: 'assets/images/fair_clouds_4k.png'
          },
          {
            name: 'stars',
            src: 'assets/images/galaxy_starfield.png'
          }
        ];
        ResourceModel.earthTextures = {};
        _results = [];
        for (_i = 0, _len = images.length; _i < _len; _i++) {
          image = images[_i];
          image.data = new Image();
          image.data.onload = function () {
            if (this.complete) {
              return checkAllPreload(1);
            }
          };
          image.data.src = image.src;
          _results.push(ResourceModel.earthTextures[image.name] = image);
        }
        return _results;
      };
      loadCSV = function (callback) {
        return CSV.loadImageInfos(function (data) {
          var loadImagesComplete;
          loadImages = function (images) {
            var checkTotalLoadedImages, image, percentageForEachImage, totalIndex, _i, _len;
            totalIndex = 0;
            if (SystemParameters.images === void 0) {
              percentageForEachImage = 90 / images.length;
              for (_i = 0, _len = images.length; _i < _len; _i++) {
                image = images[_i];
                image.data = new Image();
                image.x = image.startX;
                image.y = image.startY;
                image.a = 1;
                image.data.onload = function () {
                  if (this.complete) {
                    totalIndex++;
                    checkTotalLoadedImages();
                    return checkAllPreload(percentageForEachImage);
                  }
                };
                image.data.src = 'assets/images/' + image.name;
              }
              return checkTotalLoadedImages = function () {
                if (totalIndex >= images.length - 1) {
                  return loadImagesComplete(images);
                }
              };
            }
          };
          loadImagesComplete = function (images) {
            return SystemParameters.images = images;
          };
          return loadImages(data);
        });
      };
      service = {};
      service.preloadData = function (_callback) {
        loadPercentage = 0;
        callback = _callback;
        SystemParameters.preloadState = SystemParameters.START;
        loadImages();
        loadJsons();
        return loadCSV();
      };
      return service;
    }
  ]);
});  //# sourceMappingURL=preloaddata.js.map
