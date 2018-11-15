'use strict';

angular.module('clienteApp').factory('ClienteService', [
    '$localStorage', '$http', '$q', 'urls',
    function ($localStorage, $http, $q, urls) {
        var factory = {
            loadAllClientes: loadAllClientes,
            getAllClientes: getAllClientes,
            getCliente: getCliente,
            clienteEmprestimo: clienteEmprestimo,
            resultadoEmprestimo: resultadoEmprestimo,
            simularEmprestimo: simularEmprestimo,
            createCliente: createCliente,
            updateCliente: updateCliente,
            removeCliente: removeCliente
        };

        return factory;

        function loadAllClientes() {
            var deferred = $q.defer();
            $http.get(urls.CLIENTE_SERVICE_API).then(
                function (response) {
                    console.log('Clientes carregados com sucesso');
                    $localStorage.clientes = response.data;
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.error('Erro ao carregar clientes');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }
        
        function clienteEmprestimo() {
            return $localStorage.cliente;
        }
        
        function resultadoEmprestimo() {
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
                    console.error('Erro ao atualizar o cliente com o id :' + id);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }
        
        function getAllClientes() {
            return $localStorage.clientes;
        }

        function getCliente(id) {
            $localStorage.cliente = "";
            $localStorage.emprestimo = "";
            var deferred = $q.defer();
            $http.get(urls.CLIENTE_SERVICE_API + id).then(
                function (response) {
                    console.log('Cliente carregado com id :' + id);
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('Erro ao carregar o cliente com o id :' + id);
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
                    console.error('Erro ao criar cliente : ' + errResponse.data.errorMessage);
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
                    console.error('Erro ao atualizar cliente com id :' + id);
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
                        console.error('Erro ao remover o cliente com id :' + id);
                        deferred.reject(errResponse);
                    }
                );
            }
            return deferred.promise;
        }
    }]);