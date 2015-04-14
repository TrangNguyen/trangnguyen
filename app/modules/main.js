/* global angular */
"use strict";

//declare our app with its module dependencies
angular.module("trangApp", []);
  
// controller
angular.module("trangApp").controller('AppController', ['$scope', '$location', '$document', '$timeout', function($scope, $location, $document, $timeout) {
 
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
      }, 10000);
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
      }, 10000);
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
  
  $scope.projects = [{
    title: 'Levin-Monsigny',
    id:'levin-monsigny',
    intro: 'With their successful international expansion, the French-German landscape architechture firm needed a new internet presence to showcase their works in various themes and countries.',
    process: 'The concept and design was made by minigram. I teamed up with Berliner Süden to develop from scratch an Angular application with backend in WordPress serving as API. The result is an application that allows visitor to easily browse Levin-Monsigny Landschaftsarchitekten’s works in different languages, filters and sorting possibilities. Each project has flexible layout, a touch-friendly slideshow, suggestion of similar projects as well a shortcut to other project categories.',
    team: [ 
      { name: "Trang Nguyen",
        role: "WordPress & Angular Development",
        link: " "
      },   
      { name: "Berliner Süden",
        role: "WordPress & CSS Development",
        link: "http://www.berlinersueden.de"
      },		    
      { name: "minigram Studio für Markendesign",
        role: "Design",
        link: "http://www.minigram.de"
      }
    ],
    image: 'media/lml/lml.jpg',
    link:'http://levin-monsigny.eu/app',
    techstack: 'AngularJS, WordPress, RequireJS, Grunt, angular-translate, angular-isotope, angular-carousel, jQuery, Foundation, SASS'
  },{
    title: 'City & Home',
    id: 'city-and-home',
    intro: 'After 12 years on the market, the real estate developer City and Home approached Berliner Süden for a new website showcasing their high quality projects, from residential houses and apartments to commercial estates and office buildings.',
    process:'Berliner Süden designed the app and I developed a mobile-friendly Angular application pulling WordPress JSON API with an extensive estate search feature, scrolling navigation for quick content access, intuitive touch slideshow and asynchronous integration of Google Maps API, all lazy loaded with RequireJS.',
    team: [ 
      { name: "Trang Nguyen",
        role: "WordPress & Angular Development",
        link: " "
      },   
      { name: "Berliner Süden",
        role: " Design, WordPress & CSS Development",
        link: "http://www.berlinersueden.de"
      }
    ],
    image: 'media/cityandhome/city2.jpg',
    link:'http://city-and-home.de/#/',
    techstack: 'AngularJS, WordPress, RequireJS, Grunt, owlcarousel, angularjs-slider, angular-scroll, jQuery, Foundation, SASS'
  },{
    title: 'Random Embassy',
    id: 'random-embassy',
    intro: 'As Smyrski Creatives turned Random Embassy, the Philadelphia-based creative studio approached Berliner Süden for a new digital portfolio.',
    process: 'To showcase the Philadelphia-based creative studio Random Embassy’s various projects and design activities, I developed an Angular application that is optimized for mobile, with dynamic content loading, unique layout for every featured project and smooth transition combining AngularJS and CSS Animation. While Berliner Süden took care of WordPress backend data design and CSS-Development and Anthony Smyrski tuned the design, I optimized WordPress JSON API to feed the Angular app and  developed the app’s features.',
    team: [ 
      { name: "Trang Nguyen",
        role: "WordPress & Angular Development",
        link: " "
      },   
      { name: "Berliner Süden",
        role: "WordPress & CSS Development",
        link: "http://www.berlinersueden.de"
      },		    
      { name: "Anthony Smyrski",
        role: "Design",
        link: "http://randomembassy.com/#/"
      }
    ],
    image: 'media/randomembassy/random1.jpg',
    link:'http://randomembassy.com/#/',
    techstack: 'AngularJS, ngInfiniteScroll, WordPress, jQuery, Foundation, SASS'
  }];  
}]);