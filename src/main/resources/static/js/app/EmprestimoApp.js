var app = angular.module('emprestimoApp', ['ui.router', 'ngStorage']);
var url_base = window.location.origin;

app.constant('urls', {
    BASE: url_base,
    EMPRESTIMO_SERVICE_API: url_base + '/api/emprestimo/',
    CLIENTE_SERVICE_API: url_base + '/api/cliente/'
});

app.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('simularEmprestimo', {
            url: '/simularEmprestimo',
            templateUrl: '../partials/emprestimoLista',
            controller: 'EmprestimoController',
            controllerAs: 'ctrl',
            resolve: {
                emprestimo: function ($q, EmprestimoService) {
                    var deferred = $q.defer();
                    EmprestimoService.loadCliente().then(deferred.resolve, deferred.resolve);
                    return deferred.promise;
                }
            }
        });
        $urlRouterProvider.otherwise('/simularEmprestimo');
    }
]);
