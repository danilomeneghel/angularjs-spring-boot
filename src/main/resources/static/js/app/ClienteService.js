'use strict';

angular.module('clienteApp').factory('ClienteService', [
    '$localStorage', '$http', '$q', 'urls',
    function ($localStorage, $http, $q, urls) {
        var factory = {
            loadAllClientes: loadAllClientes,
            getAllClientes: getAllClientes,
            getCliente: getCliente,
            createCliente: createCliente,
            updateCliente: updateCliente,
            removeCliente: removeCliente
        };

        return factory;

        function loadAllClientes() {
            var deferred = $q.defer();
            $http.get(urls.CLIENTE_SERVICE_API).then(
                function (response) {
                    console.log('Fetched successfully all clientes');
                    $localStorage.clientes = response.data;
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.error('Error while loading clientes');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function getAllClientes() {
            return $localStorage.clientes;
        }

        function getCliente(id) {
            var deferred = $q.defer();
            $http.get(urls.CLIENTE_SERVICE_API + id).then(
                function (response) {
                    console.log('Fetched successfully Cliente with id :' + id);
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('Error while loading cliente with id :' + id);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function createCliente(cliente) {
            var deferred = $q.defer();
            console.log(cliente);
            $http.post(urls.CLIENTE_SERVICE_API, cliente).then(
                function (response) {
                    loadAllClientes();
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('Error while creating Cliente : ' + errResponse.data.errorMessage);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function updateCliente(cliente, id) {
            var deferred = $q.defer();
            console.log(cliente);
            $http.put(urls.CLIENTE_SERVICE_API + id, cliente).then(
                function (response) {
                    loadAllClientes();
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('Error while updating Cliente with id :' + id);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function removeCliente(id) {
            if(confirm('Tem certeza que deseja excluir esse item?')) {
                var deferred = $q.defer();
                $http.delete(urls.CLIENTE_SERVICE_API + id).then(
                    function (response) {
                        loadAllClientes();
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while removing Cliente with id :' + id);
                        deferred.reject(errResponse);
                    }
                );
            }
            return deferred.promise;
        }
    }]);