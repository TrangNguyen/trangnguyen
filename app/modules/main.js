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
  
  //videogular stuff
  $scope.currentTime = 0;
	$scope.totalTime = 0;
	$scope.state = null;
	$scope.volume = 1;
	$scope.isCompleted = false;
	$scope.API = null;
  
  // make API accessible to the template.
	$scope.onPlayerReady = function (API) {
		$scope.API = API;
	};
  
  // my custom function to seek and play using API
  $scope.seekAndPlay = function(second, id) {
    var video = angular.element(document.getElementById(id));
    $scope.API.seekTime(second, false);//this work but doesn't play
    $scope.API.play();
    $document.scrollTo(video);
  };
  
	$scope.onError = function (event) {
    console.log("VIDEOGULAR ERROR EVENT");
		console.log(event);
	};

	$scope.onCompleteVideo = function () {
		$scope.isCompleted = true;
	};

	$scope.onUpdateState = function (state) {
		$scope.state = state;
	};

	$scope.onUpdateTime = function (currentTime, totalTime) {
		$scope.currentTime = currentTime;
		$scope.totalTime = totalTime;
	};

	$scope.onUpdateVolume = function (newVol) {
		$scope.volume = newVol;
	};

	$scope.media = 
		{
      sources: [
//        {src: $sce.trustAsResourceUrl("../../media/big_buck_bunny.mp4"), type: "video/mp4"},
//        {src: $sce.trustAsResourceUrl("../../media/big_buck_bunny.webm"), type: "video/webm"},
//        {src: $sce.trustAsResourceUrl("../../media/big_buck_bunny.ogv"), type: "video/ogg"}
          {src: $sce.trustAsResourceUrl("http://v2v.cc/~j/theora_testsuite/ducks_take_off_444_720p25.ogg"), type: "video/ogg"}
      ]
    };

  $scope.config = {
		playsInline: false,
		autoHide: false,
		autoHideTime: 3000,
		autoPlay: false,
		sources: $scope.media.sources,
//		tracks: $scope.media[0].tracks,
		loop: false,
		preload: "auto",
		controls: false,
		theme: {
			url: "css/app.css"
		}
	};
  
  
}]);

//Videogular controller
//
//angular.module("trangApp").controller('VideoController', [ '$scope', '$document', '$sce',   
//  test videogular
//  function ($scope, $document, $sce) {
//		$scope.currentTime = 0;
//		$scope.totalTime = 0;
//		$scope.state = null;
//		$scope.volume = 1;
//		$scope.isCompleted = false;
//		$scope.API = null;
//    
//     make API accessible to the template.
//		$scope.onPlayerReady = function (API) {
//			$scope.API = API;
//		};
//    
//     my custom function to seek and play using API
//    $scope.seekAndPlay = function(second, id) {
//      var video = angular.element(document.getElementById(id));
//      $scope.API.seekTime(second, false);this work but doesn't play
//      $scope.API.play();
//      $document.scrollTo(video);
//    };
//    
//		$scope.onError = function (event) {
//      console.log("VIDEOGULAR ERROR EVENT");
//			console.log(event);
//		};
//
//		$scope.onCompleteVideo = function () {
//			$scope.isCompleted = true;
//		};
//
//		$scope.onUpdateState = function (state) {
//			$scope.state = state;
//		};
//
//		$scope.onUpdateTime = function (currentTime, totalTime) {
//			$scope.currentTime = currentTime;
//			$scope.totalTime = totalTime;
//		};
//
//		$scope.onUpdateVolume = function (newVol) {
//			$scope.volume = newVol;
//		};
//
//		$scope.media = [
//			{
//        sources: [
//          {src: $sce.trustAsResourceUrl("../../media/big_buck_bunny.mp4"), type: "video/mp4"},
//          {src: $sce.trustAsResourceUrl("../../media/big_buck_bunny.webm"), type: "video/webm"},
//          {src: $sce.trustAsResourceUrl("../../media/big_buck_bunny.ogv"), type: "video/ogg"}
//          {src: $sce.trustAsResourceUrl("http://v2v.cc/~j/theora_testsuite/ducks_take_off_444_720p25.ogg"), type: "video/ogg"}
//        ]
//      }
//    ];
//
//    $scope.config = {
//			playsInline: false,
//			autoHide: false,
//			autoHideTime: 3000,
//			autoPlay: false,
//			sources: $scope.media[0].sources,
//			tracks: $scope.media[0].tracks,
//			loop: false,
//			preload: "auto",
//			controls: false,
//			theme: {
//				url: "css/app.css"
//			}
//		};
//}]);