(function (angular) {
	var app = angular.module('app',['task','comment','login', 'register','ui.router', 'authentication']);
	app
    .config(config)
    .run(run);
    function config($stateProvider, $urlRouterProvider) {
     //  $urlRouterProvider.otherwise('/main');
        $stateProvider
       .state('main', {
          url: '/main',
          templateUrl: 'task/tasks.html',
          controller: 'tasksCtrl'
      })
       /*.state('project',{
        url : '/projects/:id',
        templateUrl: 'projects/project.html',
        controller: 'projectCtrl'
       })*/
       .state('entry', {
          url: '/tasks/:id',
          templateUrl: 'task/task.html',
          controller: 'taskCtrl'
      })
       .state('login', {
        url: '/login',
        templateUrl: 'users/login.html',
        controller: 'loginCtrl'
    })
       .state('register', {
        url: '/register',
        templateUrl: 'users/register.html',
        controller: 'registerCtrl'
       });
   }
   function run($rootScope, $http, $location, $localStorage, AuthenticationService, $state) {
        //postavljanje tokena nakon refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

        // ukoliko pokušamo da odemo na stranicu za koju nemamo prava, redirektujemo se na login
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          var publicStates = ['login','main', 'register'/*'entry',*/];
          var restrictedState = publicStates.indexOf(toState.name) === -1;
          if(restrictedState && !AuthenticationService.getCurrentUser()){
            $state.go('login');
          }
        });

        $rootScope.logout = function () {
            AuthenticationService.logout();
        }
        
        $rootScope.getCurrentUserRole = function () {
            if (!AuthenticationService.getCurrentUser()){
              return undefined;
            }
            else{
              return AuthenticationService.getCurrentUser().role;
            }
        }
        $rootScope.isLoggedIn = function () {
            if (AuthenticationService.getCurrentUser()){
              return true;
            }
            else{
              return false;
            }
        }
        $rootScope.getCurrentState = function () {
          return $state.current.name;
        }
    }

}(angular));