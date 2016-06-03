(function (angular) {
	var app = angular.module('app',['ui.select','task','comment','login', 'register','ui.router', 'authentication','project','user']);
	app
    .config(config)
    .run(run);
    function config($stateProvider, $urlRouterProvider) {
     $urlRouterProvider.otherwise('/login');
        $stateProvider
       .state('main', {
          url: '/main',
          templateUrl: 'projects/projects.html',
          controller: 'projectsCtrl'
      })
       .state('entry', {
          url: '/tasks/:id',
          templateUrl: 'task/task.html',
          controller: 'taskCtrl'
      })
       .state('tasks', {
          url: '/tasks',
          templateUrl: 'task/tasks.html',
          controller: 'tasksCtrl'
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
       })
      .state('project',{
        url : '/projects/tasks/:id',
        templateUrl: 'projects/project.html',
        controller: 'projectCtrl'
       })
      .state('projectUser',{
        url : '/projects/users/:id',
        templateUrl: 'projects/projectUser.html',
        controller: 'userCtrl'
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
        $rootScope.getCurrentUser = function () {
            if (!AuthenticationService.getCurrentUser()){
              return undefined;
            }
            else{
              return AuthenticationService.getCurrentUser().username;
            }
        }
        $rootScope.getCurrentUserId = function (){
          if (!AuthenticationService.getCurrentUser()){
              return undefined;
            }
            else{
              return AuthenticationService.getCurrentUser()._id;
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