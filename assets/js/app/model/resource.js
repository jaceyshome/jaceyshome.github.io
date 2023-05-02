define([
  'angular',
  'appmodule',
  'angular_resource'
], function () {
  var appModule;
  appModule = angular.module('app');
  return appModule.factory('ResourceModel', [function () {
      return {
        resourceTypes: void 0,
        resourceCategories: void 0,
        resourceCategoryIcons: void 0,
        dynasties: void 0,
        currentDynasty: void 0,
        currentDynastyId: void 0,
        currentDynastyPeriod: void 0,
        currentMap: void 0,
        newMap: void 0,
        showingPanels: [],
        showingMaximizedPanel: void 0,
        currentMapScale: 100,
        currentIntroAudio: {
          id: void 0,
          audioId: void 0,
          audio: void 0,
          text: void 0,
          state: void 0
        },
        drawingIntroText: void 0,
        loginAnimationCompleted: false,
        loadPercentage: 0,
        isShowingMaximizedPanel: false,
        isFirstTimeLoading: false
      };
    }]);
});  //# sourceMappingURL=resource.js.map
