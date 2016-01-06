//Declare Module
var questions_answers_app = angular.module('questions_answers_app', ['ngRoute', 'ngMessages', 'angularMoment']);

//Declare Routes
questions_answers_app.config(function ($routeProvider, $locationProvider) {  
  $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html'
    })
    .when('/new_question', {
        templateUrl: 'partials/new_question.html'
    })
    .when('/question/:id', {
      templateUrl: 'partials/question.html'
    })
    .when('/question/:id/new_answer', {
        templateUrl: 'partials/new_answer.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});