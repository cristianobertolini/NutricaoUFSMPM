angular.module('starter', ['ionic', 'starter.controllers', 'starter.userDB', 'starter.conDB', 'starter.Alimentos',
    'starter.controllerUsers', 'starter.CRUDAlimentos', 'starter.serviceAlimentos', 'starter.validator', 'angular-md5', 'ngRoute'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($routeProvider) {
            $routeProvider
                    .when('/', {
                        url: '/',
                        templateUrl: 'templates/presentation.html',
                        controller: 'controller'
                    })

                    .when('/cadastro', {
                        url: '/cadastro',
                        templateUrl: 'templates/cadastro.html',
                        controller: 'controllerUsers'
                    })
                    .when('/login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'controllerUsers'
                    })
                    .when('/registerAlimento', {
                        url: '/registerAliment',
                        templateUrl: 'templates/registerAlimento.html',
                        controller: 'controllerAlimentos'
                    })
                    .when('/search', {
                        url: '/search',
                        templateUrl: 'templates/searchAlimentos.html',
                        controller: 'controllerAlimentos'
                    })

                    .when('/user', {
                        url: '/user',
                        templateUrl: 'templates/user.html',
                        controller: 'controllerUsers'
                    })

                    .otherwise({
                        redirectTo: '/'
                    });
        });
