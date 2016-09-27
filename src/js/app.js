// ---- MAIN MODULE AND ITS CONFIG
angular.module('pindish', ['ngDialog', 'ngRoute', 'appDirectives',
        'angular-media-preview'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.xhtml"
            })
    })
