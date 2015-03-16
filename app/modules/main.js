/* global angular */
"use strict";

//declare our app with its module dependencies
angular.module("trangApp", [
  'duScroll',
  'ngAnimate',
  "ngSanitize",
	"com.2fdevs.videogular",
	"com.2fdevs.videogular.plugins.controls"
]);
  
angular.module("trangApp")
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode({enabled: true, requireBase: false});
}])
//config to update url on scroll
.run(function($rootScope, $location){
  $rootScope.$on('duScrollspy:becameActive', function($event, $element){
//    Automaticly update location
    var hash = $element.prop('hash');
    if(hash) {
      $location.hash(hash.substr(1)).replace();
      $rootScope.$apply();
    }
  });
});
// controller
angular.module("trangApp").controller('AppController', ['$scope', '$location', '$document',  '$sce', '$timeout', function($scope, $location, $document, $sce, $timeout) {

  //check location.hash and scroll to section
  if($location.hash()) {
    $timeout(function() {
      var scrollId = $location.hash();
      var section = angular.element(document.getElementById(scrollId));
      $document.scrollToElementAnimated(section);
    }, 300);
  }
 
  // to chang words on me section.
  $scope.things = [
    "web",
    "realtime",
    "multilingual",
    "multiuser",
    "responsive",
    "custom CMS"
  ];
  
  // to chang words on me section.
  $scope.techs = [
    "AngularJS",
    "Socket.io",
    "RequireJS",
    "MongoDB",
    "NodeJS",
    "WordPress"
  ];
  
  
  function changeWord(i) {
    if(i <$scope.things.length) {   
      $scope.thing = $scope.things[i];
      i++;    
      $timeout(function() {
        changeWord(i);
      }, 1000);
    } else {
      i = 0;
      changeWord(i);
    }    
  }
  
  function changeTech(j) {
    if(j <$scope.techs.length) {   
      $scope.tech = $scope.techs[j];
      j++;    
      $timeout(function() {
        changeTech(j);
      }, 1000);
    } else {
      j = 0;
      changeTech(j);
    }    
  }
  changeTech(0);
  
  changeWord(0);
  
  /* Videogular stuff */
  
  
  // player configuration for videgular
  $scope.config = {
  	playsInline: false,
  	autoHide: false,
  	autoHideTime: 3000,
  	autoPlay: false,
  	responsive: true,
  	loop: false,
  	preload: "auto",
  	theme: {
  		url: "css/app.css"
  	}
  };
  
	/* media to be passed onto custom directive wrapping videogular */
	$scope.projects = [
//		{
//		  index: "very-ink",
//		  title: "Very.ink",
//		  abstract: '<p> A web app for collaborative sketching. Built on Nodejs, MongoDb,<button id="very-ink-{{cuepoints[0]}}" ng-click="seekAndPlay(cuepoints[0], \'video-very-ink\')">Angularjs,</button> Raphael.js and <button id="very-ink-{{cuepoints[1]}}" ng-click="seekAndPlay(cuepoints[1], \'video-very-ink\')">Requirejs.</button></p>',
//      sources: [
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.mp4"), type: "video/mp4"},
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.webm"), type: "video/webm"},
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.ogv"), type: "video/ogg"}
//          {src: $sce.trustAsResourceUrl("http://v2v.cc/~j/theora_testsuite/ducks_take_off_444_720p25.ogg"), type: "video/ogg"}
//      ],
//      cuepoints: [2, 7]//the second value to link
//    },    
    {
		  index: "lml",
		  title: "Levin-Monsigny Landschaftsarchitekten",
		  abstract: '<p>The <button id="lml-{{cuepoints[0]}}" ng-click="seekAndPlay(cuepoints[0], \'video-lml\')">bilingual digital portfolio</button> of the French-German landscape architecture firm Levin-Monsigny Landschaftsarchitekten was ambitiously layed out in Isotope’s masonry style with their 17-year work <button id="lml-{{cuepoints[1]}}" ng-click="seekAndPlay(cuepoints[1], \'video-lml\')">sortable via filters</button>. Their projects are viewable as a grid or a <button id="lml-{{cuepoints[2]}}" ng-click="seekAndPlay(cuepoints[2], \'video-lml\')">sortable list view</button>. Masonry layout with five flexible components allow for <button id="lml-{{cuepoints[3]}}" ng-click="seekAndPlay(cuepoints[3], \'video-lml\')">many layout possibilities</button> for each project. Images on projects can be shown in high resolution in a <button id="lml-{{cuepoints[4]}}" ng-click="seekAndPlay(cuepoints[4], \'video-lml\')">touch-friendly slideshow.</button></p>',
      sources: [
        {src: $sce.trustAsResourceUrl("media/LML-portfolio.mp4.mp4"), type: "video/mp4"},
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.webm"), type: "video/webm"},
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.ogv"), type: "video/ogg"}
          {src: $sce.trustAsResourceUrl("http://v2v.cc/~j/theora_testsuite/stockholm-vfr.ogg"), type: "video/ogg"}
      ],
      cuepoints: [15, 24, 31, 50, 80]//the second value to link
    }
  ];
  
}]);

angular.module("trangApp").directive('trangVideogular', function($document, $timeout){
  return {
    restrict: 'E',
    scope: {
      filmclip:'=',//vg-src and abstract
      config:'=',//player config,
      cuepoints:'='
    },
    templateUrl: 'modules/templates/trang-videogular-directive.html',
    link: function(scope) {
//      console.log(scope.filmclip);
      scope.API = null;
      scope.onPlayerReady = function(API) {
        scope.API = API;
      };
      //bind custom controller to specific API
      scope.seekAndPlay = function(second, id) {
        var video = angular.element(document.getElementById(id));
        $document.scrollTo(video);
        scope.API.seekTime(second, false);    
        scope.API.play();
      };
      scope.onUpdateTime = function(currentTime) {
        if(scope.cuepoints.indexOf(Math.round(currentTime)) >-1) {
//          console.log('found cuepoint');
          var linkId = scope.filmclip.index+'-'+Math.round(currentTime);
          var link = angular.element(document.getElementById(linkId));
          link.addClass('highlighted');//works
          $timeout(function() {
            link.removeClass('highlighted');//works
          }, 7000);//change after 1000 miliseconds.
        }
      };
    }
  };
});

// directive to compile html element as is.
angular.module("trangApp").directive('compile', function($compile) {
  // directive factory creates a link function
  return function(scope, element, attrs) {
    scope.$watch(
      function(scope) {
         // watch the 'compile' expression for changes
        return scope.$eval(attrs.compile);
      },
      function(value) {
        // when the 'compile' expression changes assign it into the current DOM
        element.html(value);
  
        // compile the new DOM and link it to the current scope. We only compile .childNodes so that we don't get into infinite loop compiling ourselves
        $compile(element.contents())(scope);
      }
    );
  };
});