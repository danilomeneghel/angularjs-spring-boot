'use strict';

angular.module('usuarioApp').controller('UsuarioController', [
    'UsuarioService', '$scope', function (UsuarioService, $scope) {
        var self = this;
        self.usuario = {};
        self.usuarios = [];

        self.submitUsuario = submitUsuario;
        self.getAllUsers = getAllUsers;
        self.createUser = createUser;
        self.updateUser = updateUser;
        self.removeUser = removeUser;
        self.editUser = editUser;
        self.reset = reset;
		self.divCollapse = divCollapse;
		self.class = 'fa fa-plus';
		
        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function submitUsuario() {
            if (self.usuario.id === undefined || self.usuario.id === null) {
                console.log('Criando novo usuário', self.usuario);
                createUser(self.usuario);
            } else {
                updateUser(self.usuario, self.usuario.id);
                console.log('Atualizado usuário com id ', self.usuario.id);
            }
        }

        function createUser(usuario) {
            UsuarioService.createUser(usuario).then(
                function (response) {
                    console.log('Usuário criado com sucesso!');
                    self.successMessage = 'Usuário criado com sucesso!';
                    self.errorMessage = '';
                    self.done = true;
                    self.usuario = {};
                    $scope.usuarioForm.$setPristine();
                },
                function (errResponse) {
                    console.error('Erro ao criar usuário');
                    self.errorMessage = 'Erro ao criar usuário: ' + errResponse.data.errorMessage;
                    self.successMessage = '';
                }
            );
        }

        function updateUser(usuario, id) {
            UsuarioService.updateUser(usuario, id).then(
                function (response) {
                    console.log('Usuário atualizado com sucesso!');
                    self.successMessage = 'Usuário atualizado com sucesso!';
                    self.errorMessage = '';
                    self.done = true;
                    $scope.usuarioForm.$setPristine();
                },
                function (errResponse) {
                    console.error('Erro ao atualizar usuário');
                    self.errorMessage = 'Erro ao atualizar usuário ' + errResponse.data;
                    self.successMessage = '';
                }
            );
        }

        function removeUser(id) {
            UsuarioService.removeUser(id).then(
                function () {
                    console.log('Usuário ' + id + ' removido com sucesso');
                    self.successMessage = 'Usuário removido com sucesso!';
                    self.errorMessage = '';
                },
                function (errResponse) {
                    console.error('Erro ao remover usuário ' + id + ', Erro :' + errResponse.data);
                }
            );
        }

        function getAllUsers() {
            return UsuarioService.getAllUsers();
        }

        function editUser(id) {
            self.successMessage = '';
            self.errorMessage = '';
			$(".collapse").collapse('show');
            UsuarioService.getUser(id).then(
                function (usuario) {
                    self.usuario = usuario;
                },
                function (errResponse) {
                    console.error('Erro ao editar usuário ' + id + ', Erro :' + errResponse.data);
                }
            );
        }
        
        function reset() {
            self.successMessage = '';
            self.errorMessage = '';
            self.usuario = {};
            $scope.usuarioForm.$setPristine();
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