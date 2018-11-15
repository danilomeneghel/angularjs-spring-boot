'use strict';

angular.module('emprestimoApp').factory('EmprestimoService', [
    '$localStorage', '$http', '$q', 'urls',
    function ($localStorage, $http, $q, urls) {
        var factory = {
            loadCliente: loadCliente,
            getCliente: getCliente,
            getEmprestimo: getEmprestimo,
            simularEmprestimo: simularEmprestimo
        };

        return factory;
    
        function loadCliente() {
            $localStorage.cliente = "";
            $localStorage.emprestimo = "";
            var id = $localStorage.idCliente;
            var deferred = $q.defer();
            $http.get(urls.CLIENTE_SERVICE_API + id).then(
                function (response) {
                    console.log('Fetched cliente with id ' + id);
                    console.log('>>>' + response.data);
                    $localStorage.cliente = response.data;
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.error('Error while loading clientes');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }
        
        function getCliente() {
            return $localStorage.cliente;
        }
        
        function getEmprestimo() {
            return $localStorage.emprestimo;
        }

        function simularEmprestimo(emprestimo, id) {
            var deferred = $q.defer();
            console.log(emprestimo);
            console.log(id);
            $http.put(urls.EMPRESTIMO_SERVICE_API + id, emprestimo).then(
                function (response) {
                    console.log('id '+id);
                    $localStorage.emprestimo = response.data;
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.error('Error while updating Cliente with id :' + id);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }
        
    }]);