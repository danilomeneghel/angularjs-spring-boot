var app = angular.module('usuarioApp', ['ui.router', 'ngStorage']);
var url_base = window.location.origin;

app.constant('urls', {
    BASE: url_base,
    USER_SERVICE_API: url_base + '/api/usuario/'
});

app.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('usuarios', {
            url: '/usuarios',
            templateUrl: 'partials/usuarioLista',
            controller: 'UsuarioController',
            controllerAs: 'ctrl',
            resolve: {
                usuarios: function ($q, UsuarioService) {
                    var deferred = $q.defer();
                    UsuarioService.loadAllUsers().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        });
        $urlRouterProvider.otherwise('/usuarios');
    }
]);
