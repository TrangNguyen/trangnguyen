/* global angular */
"use strict";

//declare our app with its module dependencies
angular.module("trangApp", [
  'duScroll',
  'ngAnimate',
  "ngSanitize",
	"com.2fdevs.videogular",
//	"com.2fdevs.videogular.plugins.controls",
	"com.2fdevs.videogular.plugins.overlayplay",
	"com.2fdevs.videogular.plugins.poster"
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
 
  // to change words on me section.
  $scope.things = [
    "web",
    "realtime",
    "multilingual",
    "multiuser",
    "responsive",
    "custom CMS"
  ];
  
  // to change tech on me section.
  $scope.techs = [
    "AngularJS",
    "SocketIO",
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
      }, 5000);
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
      }, 5000);
    } else {
      j = 0;
      changeTech(j);
    }    
  }
  changeTech(0);
  
  $timeout(function() {
    changeWord(0);
  }, 2500);
  

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
    {
		  index: "lml",
		  title: "Levin-Monsigny Landschaftsarchitekten",
		  externalLink: "http://levin-monsigny.eu/app",
		  abstract: '<p>As Angular developer, I built the site in SPA style with a <a class="videoLink" id="lml-{{cuepoints[0]}}" ng-click="seekAndPlay(cuepoints[0], \'video-lml\')">bilingual language switch,</a> <a class="videoLink" id="lml-{{cuepoints[1]}}" ng-click="seekAndPlay(cuepoints[1], \'video-lml\')">custom filters for grid view,</a> <a class="videoLink" id="lml-{{cuepoints[2]}}" ng-click="seekAndPlay(cuepoints[2], \'video-lml\')">custom sorting for list view,</a> <a class="videoLink" id="lml-{{cuepoints[3]}}" ng-click="seekAndPlay(cuepoints[3], \'video-lml\')">flexible layout possibilities</a> and a <a class="videoLink" id="lml-{{cuepoints[4]}}" ng-click="seekAndPlay(cuepoints[4], \'video-lml\')">touch-friendly slideshow.</a></p>',
		  intro: "The digital portfolio for the French-German landscape architecture firm is my collaboration with",
		  team: [    
		    { name: "Berliner Süden",
		      role: "WordPress-Backend and CSS Development",
		      link: "http://www.berlinersueden.de"
		    },		    
		    { name: "minigram Studio für MarkenDesign",
		      role: "Design",
		      link: "http://www.minigram.de"
		    }
		  ],
      sources: [
        {src: $sce.trustAsResourceUrl("media/lml/lml.mp4"), type: "video/mp4"}
      ],
      cuepoints: [15, 24, 31, 50, 80],//the second value to link
      plugins: {
        poster: "media/lml/lml-poster.png"
      }
    }
  ];
  
}]);

/* Custom directive for videogular with cuepoints   */
angular.module("trangApp").directive('trangVideogular', function(){
  return {
    restrict: 'E',
    scope: {
      filmclip:'=',//vg-src and abstract
      config:'=',//player config,
      cuepoints:'='
    },
    templateUrl: 'modules/templates/trang-videogular-directive.html',
    link: function(scope) {
      scope.API = null;
      scope.onPlayerReady = function(API) {
        scope.API = API;
      };
      //bind custom controller to specific API
      scope.seekAndPlay = function(second) {
        scope.API.seekTime(second, false);    
        scope.API.play();
      };
      scope.onUpdateTime = function(currentTime) {
        if(scope.cuepoints.indexOf(Math.round(currentTime)) >-1) {                 
          var links = angular.element(document.getElementsByClassName("videoLink"));          
          links.removeClass('highlighted');
          
          var linkId = scope.filmclip.index+'-'+Math.round(currentTime);          
          var link = angular.element(document.getElementById(linkId));          
          link.addClass('highlighted');
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