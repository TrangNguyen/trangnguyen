/* global angular */
"use strict";

//declare our app with its module dependencies
angular.module("trangApp", [
  'duScroll'
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

//controller
angular.module("trangApp").controller('AppController', ['$scope', '$location', '$document', '$timeout', function($scope, $location, $document, $timeout) {
  
  //check location.hash and scroll to section
  $timeout(function() {
    if($location.hash()) {
      var scrollId = $location.hash();
      var section = angular.element(document.getElementById(scrollId));
      $document.scrollToElementAnimated(section);
    }
  },300);
  
  $scope.things = [
    "web",
    "realtime",
    "angular",
    "express",
    "responsive"
  ];
  
  $scope.projects = [
    { title: 'Very Ink',
      scrollId: 'very-ink',
      abstract: 'Bacon ipsum dolor sit amet sausage tail capicola ground round hamburger ham hock. Short ribs pig andouille meatball, pastrami tri-tip fatback ham hock shank kielbasa swine. Rump pancetta jerky kielbasa doner beef ribs tongue hamburger strip steak drumstick andouille shoulder shank flank. Swine drumstick meatball pig beef sausage strip steak.',
      url: 'http://very.ink',
      media: 'http://lorempixel.com/1000/500/'
    },
    { title: 'Levin Monsigny Landscape Architects',
      scrollId: 'lml',
      abstract: 'Shank fatback pastrami short loin, turkey jowl kielbasa ribeye chicken jerky drumstick flank ham. Swine shankle pork belly kielbasa shoulder flank jowl, sirloin doner. Kevin tri-tip bresaola leberkas. Swine ball tip cow strip steak. Ham filet mignon pork chop, pork fatback andouille pork loin shoulder jowl swine strip steak turducken prosciutto rump.',
      url: 'http://levin-monsigny.eu/app',
      media: 'http://lorempixel.com/1000/600/'
    },
    { title: 'City & Home',
      scrollId: 'city-and-home',
      abstract: 'Bacon strip steak ground round, tongue pastrami short ribs pork chop venison turducken sausage sirloin. Flank chicken pork chop capicola turkey turducken cow pork loin biltong meatball drumstick pancetta filet mignon ground round fatback. Ham hock jerky short ribs brisket. Meatloaf shoulder pork chop capicola, sirloin swine pig pork. Jerky ribeye hamburger pork loin sirloin kevin bresaola boudin chuck flank. Ham hock pork belly chicken jerky rump bresaola.',
      url: 'http://city-and-home.de/',
      media: 'http://lorempixel.com/1000/400/'
    }
  ];
}]).value('duScrollOffset', 30);