'use strict';

angular.module('emprestimoApp').controller('EmprestimoController', [
    'EmprestimoService', '$scope', '$localStorage', function (EmprestimoService, $scope, $localStorage) {
        var self = this;
        self.emprestimo = {};

        self.submit = submit;
        self.getCliente = getCliente;
        self.getEmprestimo = getEmprestimo;
        self.simularEmprestimo = simularEmprestimo;
        self.reset = reset;

        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;
        
        function submit() {
            var id = $localStorage.idCliente;
            console.log('Simulando Emprestimo', self.emprestimo);
            simularEmprestimo(self.emprestimo, id);
        }
        
        function getCliente() {
            return EmprestimoService.getCliente();
        }
        
        function getEmprestimo() {
            return EmprestimoService.getEmprestimo();
        }

        function simularEmprestimo(emprestimo, id) {
            EmprestimoService.simularEmprestimo(emprestimo, id).then(
                function (response) {
                    console.log('Emprestimo simulado com sucesso');
                    self.done = true;
                    //$scope.myForm.$setPristine();
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
            self.emprestimo = {};
            //$scope.myForm.$setPristine();
        }
    }]);