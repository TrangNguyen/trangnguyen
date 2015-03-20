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
  
  //make a slight delay of the 2 text switches.
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
		  title: "LML",
		  externalLink: "http://levin-monsigny.eu/app",
		  abstract: '<p>With their successful international expansion, the French-German landscape architechture firm needed a new internet presence to showcase their works in various themes and countries.</p><p>I developed from scratch an Angular application with backend in WordPress serving as API. The result is an application that allows visitor to easily browse their works in <a class="videoLink" id="lml-{{cuepoints[0]}}" ng-click="seekAndPlay(cuepoints[0], \'video-lml\')">different&#160;languages,</a> <a class="videoLink" id="lml-{{cuepoints[1]}}" ng-click="seekAndPlay(cuepoints[1], \'video-lml\')">  filters&#160;and&#160;sorting,</a> <a class="videoLink" id="lml-{{cuepoints[2]}}" ng-click="seekAndPlay(cuepoints[2], \'video-lml\')">grid&#160;and&#160;list&#160;views</a>. Each project has <a class="videoLink" id="lml-{{cuepoints[3]}}" ng-click="seekAndPlay(cuepoints[3], \'video-lml\')">flexible&#160;layout</a> and a <a class="videoLink" id="lml-{{cuepoints[4]}}" ng-click="seekAndPlay(cuepoints[4], \'video-lml\')">touch-friendly</a> slideshow.</p>',
		  intro: "The digital portfolio for LML was made by",
		  team: [ 
		    { name: "Trang Nguyen",
		      role: "WordPress and Angular Development",
		      link: " "
		    },   
		    { name: "Berliner Süden",
		      role: "WordPress and CSS Development",
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
    },
    
    {
      index: "randomembassy",
      title: "Random Embassy",
      externalLink: "http://randomembassy.com/#/",
      abstract: '<p>As Smyrski Creatives turned Random Embassy, the Philadelphia-based creative studio approached Berliner Süden for a new digital portfolio.</p><p> Together with Berliner Süden, I developed an Angular application that is <a class="videoLink" id="randomembassy-{{cuepoints[0]}}" ng-click="seekAndPlay(cuepoints[0], \'video-randomembassy\')">optimized&#160;for&#160;mobile,</a> with <a class="videoLink" id="randomembassy-{{cuepoints[1]}}" ng-click="seekAndPlay(cuepoints[1], \'video-randomembassy\')">dynamic&#160;content&#160;loading,</a> <a class="videoLink" id="randomembassy-{{cuepoints[2]}}" ng-click="seekAndPlay(cuepoints[2], \'video-randomembassy\')">unique&#160;layout</a>  for each project and <a class="videoLink" id="randomembassy-{{cuepoints[3]}}" ng-click="seekAndPlay(cuepoints[3], \'video-randomembassy\')">smooth&#160;transition</a> combining Angular and CSS animation.</p>',
      intro: "Random Embassy's web presence was made by",
      team: [ 
        { name: "Trang Nguyen",
          role: "WordPress and Angular Development",
          link: " "
        },   
        { name: "Berliner Süden",
          role: "WordPress and CSS Development",
          link: "http://www.berlinersueden.de"
        },		    
        { name: "Random Embassy",
          role: "Design",
          link: "http://randomembassy.com/#/"
        }
      ],
      sources: [
        {src: $sce.trustAsResourceUrl("media/lml/lml.mp4"), type: "video/mp4"}
      ],
      cuepoints: [15, 31, 50, 80],//the second value to link
      plugins: {
        poster: "media/randomembassy/random-poster.png"
      }
    },
    
    {
      index: "city-and-home",
      title: "City and Home",
      externalLink: "http://city-and-home.de/#/",
      abstract: '<p>After 12 years on the market, the real estate developer City and Home approached Berliner Süden for a new website, showcase their high quality projects, from residential houses and apartments to commercial estates and office buildings.</p><p> Together with Berliner Süden, I developed an mobile-first Angular application pulling WordPress JSON API with an extensive estate <a class="videoLink" id="city-and-home-{{cuepoints[0]}}" ng-click="seekAndPlay(cuepoints[0], \'video-city-and-home\')">search&#160;feature,</a> with <a class="videoLink" id="city-and-home-{{cuepoints[1]}}" ng-click="seekAndPlay(cuepoints[1], \'video-city-and-home\')">scrolling&#160;</a> navigation for quick content access, intuitive <a class="videoLink" id="city-and-home-{{cuepoints[2]}}" ng-click="seekAndPlay(cuepoints[2], \'video-city-and-home\')">touch-friendly</a>  slideshow and smart integration of <a class="videoLink" id="city-and-home-{{cuepoints[3]}}" ng-click="seekAndPlay(cuepoints[3], \'video-city-and-home\')">Google&#160;Maps,</a> all lazy loaded with RequireJS.</p>',
      intro: "City and Home's new website was made by",
      team: [ 
        { name: "Trang Nguyen",
          role: "WordPress and Angular Development",
          link: " "
        },   
        { name: "Berliner Süden",
          role: " Design, WordPress and CSS Development",
          link: "http://www.berlinersueden.de"
        }
      ],
      sources: [
        {src: $sce.trustAsResourceUrl("media/lml/lml.mp4"), type: "video/mp4"}
      ],
      cuepoints: [15, 31, 50, 80],//the second value to link
      plugins: {
        poster: "media/cityandhome/city-and-home-poster.png"
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