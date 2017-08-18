(function() {
    'use strict';

    angular.module('myra')
        .config(routeConfig)
        .run(highLightMenu);
  
    function routeConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                title : 'Login',
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (Authentication.isAuthenticated()) {
                        $state.go('secure.status');
                    }
                }],
            })
            .state('home', {
                url: '/home',
                templateUrl: '/home/unsecurehome.html',
                title: 'Home',
                highlight : 'home',
                controller: 'HomeController',
                controllerAs: 'vm',
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (Authentication.isAuthenticated()) {
                        $state.go('secure.status');
                    }
                }],
            })
            .state('adminHome', {
                url: '/adminHome',
                templateUrl: '/home/adminHome.html',
                title: 'AdminHome',
                highlight : 'adminhome',
                controller: 'AdminHomeController',
                controllerAs: 'vm',
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (Authentication.isAuthenticated()) {
                        $state.go('secure.status');
                    }
                }],
            })
            .state('secure', {
                url: '/secure',
                templateUrl: '/shared/secure.html',
                title: 'Secure',
                controller: 'SecureController',
                controllerAs: 'vm',
                abstract: true,
                onEnter: ['$state', 'Authentication', function ($state, Authentication) {
                    if (!Authentication.isAuthenticated()) {
                        $state.go('login');
                    }
                }],
            })
            .state('secure.setting', {
                url: '/setting',
                templateUrl: '/setting/setting.html',
                title: 'Setting',
                highlight: 'setting',
                controller: 'SettingController',
                controllerAs: 'vm',
                abstract: true
            })
           .state('secure.setting.user', {
                url: '/user',
                templateUrl: '/setting/user/user.html',
                title: 'User',
                highlight: 'user',
                highLightSetting : 'setting',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .state('secure.setting.edit-user', {
                url: '/user/{id}',
                params: {
                    id: { value: 'new' }
                },
                templateUrl: '/setting/user/edit-user.html',
                title: 'User',
                highlight: 'user',
                highLightSetting: 'setting',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .state('secure.setting.reset-user', {
                url: '/user/{id}/reset',
                templateUrl: '/setting/user/reset-user.html',
                title: 'User',
                highlight: 'user',
                highLightSetting: 'setting',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .state('secure.status', {
                url: '/status',
                templateUrl: '/setting/material/material.html',
                title: 'Material',
                highlight: 'status',
                highLightSetting: 'setting',
                controller: 'MaterialController',
                controllerAs: 'vm'
            })
            ;
        
        $urlRouterProvider.otherwise('/home');
    }

    function highLightMenu($rootScope) {
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;

        });
    }
    
})();