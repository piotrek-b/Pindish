// ---- MAIN MODULE AND ITS CONFIG
angular.module('pindish', ['ngDialog', 'ngRoute', 'appDirectives', 'appFilters',
        'angular-media-preview'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.xhtml"
            })
    })
