/* global angular */
"use strict";

//declare our app with its module dependencies
angular.module("trangApp", ["duScroll"]).value('duScrollOffset', 30);
  
// controller
angular.module("trangApp").controller('AppController', ['$scope', '$location', '$anchorScroll', '$document', '$timeout', function($scope, $location, $anchorScroll, $document, $timeout) {
 
  // to change words on me section.
  $scope.things = [
    "web",
    "mobile",
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
  
  //adjectives for animation  
  function changeWord(i) {
    if(i <$scope.things.length) {  
      $scope.thing = $scope.things[i];
      i++;    
      $timeout(function() {
        changeWord(i);
      }, 2000);
    } else {
      i = 0;
      changeWord(i);
    }    
  }
  
  //technologies for animation
  function changeTech(j) {
    if(j <$scope.techs.length) {   
      $scope.tech = $scope.techs[j];
      j++;    
      $timeout(function() {
        changeTech(j);
      }, 2000);
    } else {
      j = 0;
      changeTech(j);
    }    
  }
  changeTech(0);
  
  changeWord(0);
  
  //make a slight delay between 2 text switches.
  $timeout(function() {
    changeWord(1);
  }, 1000);
  
  //scroll to content with anchor scroll, remove hash.
  $scope.scrollTo = function(id) {
    var old = $location.hash();
    $location.hash(id);
    $anchorScroll();
    //reset to old to keep any additional routing logic from kicking in
    $location.hash(old);
  };
  
  //about me
  $scope.reasons = [{
    head: 'I’m a self-taught developer',
    description: 'I studied Computer Science Education, Ecology and most recently Film, (see my <a target="_blank" href="http://midcut.com">film</a> portfolio). My video installation work lead me to development and my experience in other disciplines help me in my development work.'
  },{
    head: 'I’m a doer',
    description: 'I take great pride in translating challenging design concepts into working applications and love seeing the result of many hours of work online.'
  },{
    head: 'I’m a team player',
    description: 'I respect my client’s interest and I love working on a team together to build great products.'
  },{
    head: 'I’m a perfectionist',
    description: 'I do extensive research, prototyping, testing and iteration. A project is finished once I have seen the result, have had a wrap-up with involved parties and drawn lessons for the next job.'
  }];
  
  //recent projects  
  $scope.projects = [{
    title: 'Levin-Monsigny Landschaftsarchitekten',
    id:'levin-monsigny',
    intro: 'With their successful international expansion, the French-German landscape architecture firm needed a new internet presence to showcase their works across the globe.',
    process: 'The concept and design was made by minigram. I was hired by Berliner Süden to develop an Angular application with a WordPress backend serving as a content API. The result is an application that allows visitors to explore Levin-Monsigny Landschaftsarchitekten’s projects using different languages, filters and sorting possibilities. Each project entry makes use of flexible layout modules, a touch-friendly slideshow, suggestions of similar projects as well a shortcut to other project categories.',
    team: [
      { name: "minigram Studio für Markendesign",
        role: "Design",
        link: "http://www.minigram.de"
      },    
      { name: "Berliner Süden",
        role: "WordPress & CSS Development",
        link: "http://www.berlinersueden.de"
      },		    
      { name: "Trang Nguyen",
        role: "WordPress & Angular Development",
        link: " "
      }
    ],
    image: 'media/lml/lml.jpg',
    link:'http://levin-monsigny.eu/',
    techstack: 'AngularJS, WordPress, RequireJS, Grunt, angular-translate, angular-isotope, angular-carousel, jQuery, Foundation, SASS'
  },{
    title: 'City & Home',
    id: 'city-and-home',
    intro: 'After 12 years on the market, the real estate developer City and Home approached Berliner Süden for a new website showcasing their high quality projects, from residential houses and apartments to commercial estates and office buildings.',
    process:'Berliner Süden designed the app and I developed a mobile-friendly Angular application pulling WordPress JSON API with an extensive estate search feature, scrolling navigation for quick content access, an intuitive touch-friendly slideshow and asynchronous integration of Google Maps API.',
    team: [ 
      { name: "Berliner Süden",
        role: " Design, WordPress & CSS Development",
        link: "http://www.berlinersueden.de"
      }, { name: "Trang Nguyen",
        role: "WordPress & Angular Development",
        link: " "
      }      
    ],
    image: 'media/cityandhome/city2.jpg',
    link:'http://city-and-home.de/#/',
    techstack: 'AngularJS, WordPress, RequireJS, Grunt, owlcarousel, angularjs-slider, angular-scroll, jQuery, Foundation, SASS'
  },{
    title: 'Random Embassy',
    id: 'random-embassy',
    intro: 'Random Embassy, the Philadelphia-based creative studio approached Berliner Süden for a new mobile-ready digital portfolio.',
    process: 'To showcase Random Embassy’s various projects and design activities, I developed an Angular application that is optimized for mobile, with dynamic content loading, unique layout for every featured project and smooth transitions making use of AngularJS and CSS animations. While Berliner Süden took care of WordPress backend data design and CSS-Development, I optimized the WordPress JSON API to feed content to the Angular app.',
    team: [ 
      { name: "Anthony Smyrski",
        role: "Design",
        link: "http://randomembassy.com/#/"
      }, { name: "Berliner Süden",
        role: "WordPress & CSS Development",
        link: "http://www.berlinersueden.de"
      }, { name: "Trang Nguyen",
        role: "WordPress & Angular Development"
      } 
    ],
    image: 'media/randomembassy/random1.jpg',
    link:'http://randomembassy.com/#/',
    techstack: 'AngularJS, ngInfiniteScroll, WordPress, jQuery, Foundation, SASS'
  }];  
}]);

// directive to compile html element as is, inline linking
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