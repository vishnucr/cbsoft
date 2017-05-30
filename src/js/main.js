'use strict';

/* Controllers */

// setting the basic settings for the app, 

angular.module('app')
  .controller('AppCtrl', ['$rootScope', '$scope', '$translate', '$localStorage', '$window',
    function ($rootScope, $scope, $translate, $localStorage, $window) {
      
      //watching current state
      // $scope.$watch('$state.current', function(newValue, oldValue) {
      //   console.log(newValue);
      // });          
      
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Angulr',
        version: '2.0.1',
        // for chart colors
        color: {
          primary: '#7266ba',
          info: '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger: '#f05050',
          light: '#e8eff0',
          dark: '#3a3f51',
          black: '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if (angular.isDefined($localStorage.settings)) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function () {
        if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = { en: 'English', de_DE: 'German', it_IT: 'Italian' };
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
      $scope.setLang = function (langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice($window) {
        // Adapted from http://www.detectmobilebrowsers.com
        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

    }])
  .run(['$rootScope','$state','$cookieStore','$http', function ($rootScope, $state, $cookieStore, $http) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }
      // else {
      //   $state.go('access.signin');
      // }


      //error here, fix it
      $rootScope.$on('$stateChangeStart',
        function (event, toState, toParams, fromState, fromParams, options) {
          if ($state.current.name !== "access.signin" && !$rootScope.globals.currentUser) {
            $state.go('access.signin');
          }
        });
  }]);
