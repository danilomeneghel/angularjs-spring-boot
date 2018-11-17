'use strict';

angular.module('clienteApp').controller('ClienteController', [
    'ClienteService', '$scope', function (ClienteService, $scope) {
        var self = this;
        self.cliente = {};
        self.clientes = [];
        self.emprestimo = {};

        self.submitCliente = submitCliente;
        self.submitEmprestimo = submitEmprestimo;
        self.getAllClientes = getAllClientes;
        self.createCliente = createCliente;
        self.updateCliente = updateCliente;
        self.removeCliente = removeCliente;
        self.editCliente = editCliente;
        self.clienteEmprestimo = clienteEmprestimo;
        self.resultadoEmprestimo = resultadoEmprestimo;
        self.simularEmprestimo = simularEmprestimo;
        self.reset = reset;
        self.resetEmprestimo = resetEmprestimo;
		self.divCollapse = divCollapse;
		self.class = 'fa fa-plus';
		
        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        function submitCliente() {
            if (self.cliente.id === undefined || self.cliente.id === null) {
                console.log('Criando novo cliente', self.cliente);
                createCliente(self.cliente);
            } else {
                updateCliente(self.cliente, self.cliente.id);
                console.log('Atualizando cliente com id ', self.cliente.id);
            }
        }
        
        function submitEmprestimo() {
            simularEmprestimo(self.emprestimo, self.cliente.id);
            console.log('Simulando emprestimo do cliente id ', self.cliente.id);
        }

        function createCliente(cliente) {
            ClienteService.createCliente(cliente).then(
                function (response) {
                    console.log('Cliente criado com sucesso!');
                    self.successMessage = 'Cliente criado com sucesso!';
                    self.errorMessage = '';
                    self.done = true;
                    self.cliente = {};
                    $scope.clienteForm.$setPristine();
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
                    $scope.clienteForm.$setPristine();
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
                    self.successMessage = 'Cliente removido com sucesso!';
                    self.errorMessage = '';
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
			$(".collapse").collapse('show');
            ClienteService.getCliente(id).then(
                function (cliente) {
                    self.cliente = cliente;
                },
                function (errResponse) {
                    console.error('Erro ao editar cliente ' + id + ', Erro :' + errResponse.data);
                }
            );
        }
        
        function clienteEmprestimo(id) {
            self.errorMessage = '';
            ClienteService.getCliente(id).then(
                function (cliente) {
                    self.cliente = cliente;
                },
                function (errResponse) {
                    console.error('Erro ao localizar cliente ' + id + ', Erro :' + errResponse.data);
                }
            );
        }
        
        function resultadoEmprestimo() {
            return ClienteService.resultadoEmprestimo();
        }

        function simularEmprestimo(emprestimo, id) {
            self.errorMessage = '';
            ClienteService.simularEmprestimo(emprestimo, id).then(
                function (response) {
                    console.log('Emprestimo simulado com sucesso');
                    self.done = true;
                    //$scope.emprestimoForm.$setPristine();
                },
                function (errResponse) {
                    console.error('Erro ao simular emprestimo');
                    self.errorMessage = 'Erro ao simular emprestimo ' + errResponse.data;
                }
            );
        }

        function reset() {
            self.successMessage = '';
            self.errorMessage = '';
            self.cliente = {};
            $scope.clienteForm.$setPristine();
        }
        
        function resetEmprestimo() {
            self.errorMessage = '';
            self.emprestimo = {};
            $scope.emprestimoForm.$setPristine();
        }
		
		function divCollapse() {
			$(".collapse").collapse('toggle');
		}
		
		$(".collapse").on('show.bs.collapse', function () {
			self.class = 'fa fa-minus';
		}).on('hide.bs.collapse', function () {
			self.class = 'fa fa-plus';
		});
    }]);