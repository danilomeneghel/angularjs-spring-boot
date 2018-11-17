var app = angular.module('clienteApp', ['ui.router', 'ngStorage', 'ui.bootstrap']);
var url_base = window.location.origin;

app.constant('urls', {
    BASE: url_base,
    CLIENTE_SERVICE_API: url_base + '/api/cliente/',
    EMPRESTIMO_SERVICE_API: url_base + '/api/emprestimo/'
});

app.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('clientes', {
            url: '/clientes',
            templateUrl: 'partials/clienteLista',
            controller: 'ClienteController',
            controllerAs: 'ctrl',
            resolve: {
                clientes: function ($q, ClienteService) {
                    var deferred = $q.defer();
                    ClienteService.loadAllClientes().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        });
        $urlRouterProvider.otherwise('/clientes');
    }
]);
