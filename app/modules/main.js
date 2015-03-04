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
    var scrollId = $location.hash();
    var section = angular.element(document.getElementById(scrollId));
    $document.scrollToElementAnimated(section);
  }
 
  // to chang words on me section.
  $scope.things = [
    "web",
    "realtime",
    "angular",
    "express",
    "responsive"
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
      $timeout(function() {
        changeWord(i);
      }, 1000);
    }    
  }
  changeWord(0);
  
  /* Videogular stuff */
  
  /* custom function to seek and play using API */
  $scope.seekAndPlay = function(second, id) {
    var video = angular.element(document.getElementById(id));
    $document.scrollTo(video);
    //TODO: find the scope.
    var thing = angular.element(document.getElementsByName('vg-controls')).scope();
    console.log(thing);
//    $scope.API.seekTime(second, false);    
//    $scope.API.play();
  };
  
	//media to be passed onto custom directive wrapping videogular
	$scope.filmclips = [
		{
		  abtract: '<p> A web app for collaborative sketching. Built on Nodejs, MongoDb,<button ng-click="seekAndPlay(3, \'veryInk-video\')">Angularjs,</button> Raphael.js and <button ng-click="seekAndPlay(7, \'veryInk-video\')">Requirejs.</button></p>',
      sources: [
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.mp4"), type: "video/mp4"},
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.webm"), type: "video/webm"},
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.ogv"), type: "video/ogg"}
          {src: $sce.trustAsResourceUrl("http://v2v.cc/~j/theora_testsuite/ducks_take_off_444_720p25.ogg"), type: "video/ogg"}
      ]
    },    
    {
		  abstract: '<p>showcasing the French-German firm\'s works in searchable categories. A complete custom CMS built in Angularjs pulling <button ng-click="seekAndPlay(2, \'lml-video\')">WordPress JSON API</button> topped with Isotope for masonry effects and with Pascal Precht\'s translation module for <button ng-click="seekAndPlay(3, \'lml-video\')">bilingual features.</button> </p>',
      sources: [
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.mp4"), type: "video/mp4"},
//        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.webm"), type: "video/webm"},
        {src: $sce.trustAsResourceUrl("media/big_buck_bunny.ogv"), type: "video/ogg"}
//          {src: $sce.trustAsResourceUrl("http://v2v.cc/~j/theora_testsuite/stockholm-vfr.ogg"), type: "video/ogg"}
      ]
    }
  ];
  
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
}]);

angular.module("trangApp").directive('trangVideogular', function(){
  return {
    restrict: 'E',
    scope: {
      filmclip:'=',//vg-src and abstract
      config:'=',//player config,
      abstract:'='
    },
    templateUrl: 'modules/templates/trang-videogular-directive.html',
    link: function(scope) {
//      console.log(scope.filmclip);
      scope.API = null;
      scope.onPlayerReady = function(API) {
        scope.API = API;
      };
    }
  };
});