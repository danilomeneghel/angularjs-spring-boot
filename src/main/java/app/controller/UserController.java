package app.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import app.entity.User;
import app.service.UserServiceImpl;
import app.util.CustomErrorType;

@RestController
@RequestMapping("/api")
public class UserController {

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserServiceImpl userService;

    // Lista todos os Usuários
    @RequestMapping(value = "/usuario/", method = RequestMethod.GET)
    public ResponseEntity<List<User>> listAllUsers() {
        List<User> users = userService.findAllUsers();
        if (users.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    // Pega um Usuário
    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        User user = userService.findUserById(id);
        if (user == null) {
            logger.error("Usuário com id {} não encontrado.", id);
            return new ResponseEntity(new CustomErrorType("Usuário com id " + id
                    + " não encontrado."), HttpStatus.NOT_FOUND);
        }

        // Muda valor da senha para não ser mostrado
        user.setPassword(null);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // Cria o Usuário
    @RequestMapping(value = "/usuario/", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user, UriComponentsBuilder ucBuilder) {
        if (userService.isUserExist(user)) {
            logger.error("Não é possível criar. Usuário com nome {} já existe", user.getUsername());
            return new ResponseEntity(new CustomErrorType("Não é possível criar. Usuário com nome "
                    + user.getUsername() + " já existe."), HttpStatus.CONFLICT);
        }

        // Criptografa a senha
        userService.encryptPassword(user);

        userService.saveUser(user);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/usuario/{id}").buildAndExpand(user.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    // Atualiza o Usuário
    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @RequestBody User user) {
        if (userService.findUserById(id) == null) {
            logger.error("Não é possível atualizar. Usuário com id {} não encontrado.", id);
            return new ResponseEntity(new CustomErrorType("Não é possível atualizar. Usuário com id " + id + " não encontrado."),
                    HttpStatus.NOT_FOUND);
        }

        // Criptografa a senha
        userService.encryptPassword(user);

        userService.updateUser(user);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    // Exclui o Usuário
    @RequestMapping(value = "/usuario/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        User user = userService.findUserById(id);
        if (user == null) {
            logger.error("Não é possível excluir. Usuário com id {} não encontrado.", id);
            return new ResponseEntity(new CustomErrorType("Não é possível excluir. Usuário com id " + id + " não encontrado."),
                    HttpStatus.NOT_FOUND);
        }
        userService.deleteUserById(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

    // Exclui todos os Usuários
    @RequestMapping(value = "/usuario/", method = RequestMethod.DELETE)
    public ResponseEntity<User> deleteAllUsers() {
        userService.deleteAllUsers();
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

}
