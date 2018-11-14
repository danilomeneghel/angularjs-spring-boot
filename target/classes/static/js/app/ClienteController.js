'use strict';

angular.module('clienteApp').controller('ClienteController', [
    'ClienteService', '$scope', function (ClienteService, $scope) {
        var self = this;
        self.cliente = {};
        self.clientes = [];

        self.submit = submit;
        self.getAllClientes = getAllClientes;
        self.createCliente = createCliente;
        self.updateCliente = updateCliente;
        self.removeCliente = removeCliente;
        self.editCliente = editCliente;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function submit() {
            console.log('Submitting');
            if (self.cliente.id === undefined || self.cliente.id === null) {
                console.log('Saving New Cliente', self.cliente);
                createCliente(self.cliente);
            } else {
                updateCliente(self.cliente, self.cliente.id);
                console.log('Cliente atualizado com id ', self.cliente.id);
            }
        }

        function createCliente(cliente) {
            ClienteService.createCliente(cliente).then(
                function (response) {
                    console.log('Cliente criado com sucesso!');
                    self.successMessage = 'Cliente criado com sucesso!';
                    self.errorMessage = '';
                    self.done = true;
                    self.cliente = {};
                    $scope.myForm.$setPristine();
                },
                function (errResponse) {
                    console.error('Erro ao criar usuário');
                    self.errorMessage = 'Erro ao criar usuário: ' + errResponse.data.errorMessage;
                    self.successMessage = '';
                }
            );
        }

        function updateCliente(cliente, id) {
            ClienteService.updateCliente(cliente, id).then(
                function (response) {
                    console.log('Cliente atualizado com sucesso');
                    self.successMessage = 'Cliente atualizado com sucesso';
                    self.errorMessage = '';
                    self.done = true;
                    $scope.myForm.$setPristine();
                },
                function (errResponse) {
                    console.error('Erro ao atualizar cliente');
                    self.errorMessage = 'Erro ao atualizar cliente ' + errResponse.data;
                    self.successMessage = '';
                }
            );
        }

        function removeCliente(id) {
            ClienteService.removeCliente(id).then(
                function () {
                    console.log('Cliente ' + id + ' removido com sucesso');
                },
                function (errResponse) {
                    console.error('Erro ao remover cliente ' + id + ', Erro :' + errResponse.data);
                }
            );
        }

        function getAllClientes() {
            return ClienteService.getAllClientes();
        }

        function editCliente(id) {
            self.successMessage = '';
            self.errorMessage = '';
            ClienteService.getCliente(id).then(
                function (cliente) {
                    self.cliente = cliente;
                },
                function (errResponse) {
                    console.error('Erro ao remover cliente ' + id + ', Erro :' + errResponse.data);
                }
            );
        }
        
        function reset() {
            self.successMessage = '';
            self.errorMessage = '';
            self.cliente = {};
            $scope.myForm.$setPristine();
        }
    }]);