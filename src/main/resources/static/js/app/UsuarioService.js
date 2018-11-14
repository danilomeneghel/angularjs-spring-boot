'use strict';

angular.module('usuarioApp').factory('UsuarioService', [
    '$localStorage', '$http', '$q', 'urls',
    function ($localStorage, $http, $q, urls) {
        var factory = {
            loadAllUsers: loadAllUsers,
            getAllUsers: getAllUsers,
            getUser: getUser,
            createUser: createUser,
            updateUser: updateUser,
            removeUser: removeUser
        };

        return factory;

        function loadAllUsers() {
            var deferred = $q.defer();
            $http.get(urls.USER_SERVICE_API).then(
                function (response) {
                    console.log('Fetched successfully all usuarios');
                    $localStorage.usuarios = response.data;
                    deferred.resolve(response);
                },
                function (errResponse) {
                    console.error('Error while loading usuarios');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function getAllUsers() {
            return $localStorage.usuarios;
        }

        function getUser(id) {
            var deferred = $q.defer();
            $http.get(urls.USER_SERVICE_API + id).then(
                function (response) {
                    console.log('Fetched successfully User with id :' + id);
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('Error while loading usuario with id :' + id);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function createUser(usuario) {
            var deferred = $q.defer();
            $http.post(urls.USER_SERVICE_API, usuario).then(
                function (response) {
                    loadAllUsers();
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('Error while creating User : ' + errResponse.data.errorMessage);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function updateUser(usuario, id) {
            var deferred = $q.defer();
            $http.put(urls.USER_SERVICE_API + id, usuario).then(
                function (response) {
                    loadAllUsers();
                    deferred.resolve(response.data);
                },
                function (errResponse) {
                    console.error('Error while updating User with id :' + id);
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
        }

        function removeUser(id) {
            if(confirm('Tem certeza que deseja excluir esse item?')) {
                var deferred = $q.defer();
                $http.delete(urls.USER_SERVICE_API + id).then(
                    function (response) {
                        loadAllUsers();
                        deferred.resolve(response.data);
                    },
                    function (errResponse) {
                        console.error('Error while removing User with id :' + id);
                        deferred.reject(errResponse);
                    }
                );
            }
            return deferred.promise;
        }
    }]);