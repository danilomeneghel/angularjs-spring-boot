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

import app.entity.Cliente;
import app.service.ClienteServiceImpl;
import app.util.CustomErrorType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api")
public class ClienteController {

    public static final Logger logger = LoggerFactory.getLogger(ClienteController.class);

    @Autowired
    ClienteServiceImpl clienteService;

    // Lista todos os Usuários
    @RequestMapping(value = "/cliente/", method = RequestMethod.GET)
    public ResponseEntity<List<Cliente>> listAllClientes() {
        List<Cliente> clientes = clienteService.findAllClientes();
        if (clientes.isEmpty()) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<Cliente>>(clientes, HttpStatus.OK);
    }

    // Pega um Usuário
    @RequestMapping(value = "/cliente/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getCliente(@PathVariable("id") Long id) {
        Cliente cliente = clienteService.findClienteById(id);
        if (cliente == null) {
            logger.error("Usuário com id {} não encontrado.", id);
            return new ResponseEntity(new CustomErrorType("Usuário com id " + id
                    + " não encontrado."), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
    }

    // Cria o Cliente
    @RequestMapping(value = "/cliente/", method = RequestMethod.POST)
    public ResponseEntity<?> createCliente(@RequestBody Cliente cliente, UriComponentsBuilder ucBuilder) {
        if (clienteService.isClienteExist(cliente)) {
            logger.error("Não é possível criar. Cliente com nome {} já existe", cliente.getNome());
            return new ResponseEntity(new CustomErrorType("Não é possível criar. Cliente com nome "
                    + cliente.getNome() + " já existe."), HttpStatus.CONFLICT);
        }
        
        // Adiciona o risco
        clienteService.addRisk(cliente);
        
        clienteService.saveCliente(cliente);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/cliente/{id}").buildAndExpand(cliente.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);
    }

    // Atualiza o Cliente
    @RequestMapping(value = "/cliente/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateCliente(@PathVariable("id") Long id, @RequestBody Cliente cliente) {
        if (clienteService.findClienteById(id) == null) {
            logger.error("Não é possível atualizar. Cliente com id {} não encontrado.", id);
            return new ResponseEntity(new CustomErrorType("Não é possível atualizar. Cliente com id " + id + " não encontrado."),
                    HttpStatus.NOT_FOUND);
        }
        
        // Atualiza o risco
        clienteService.addRisk(cliente);
        
        clienteService.updateCliente(cliente);
        return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);
    }

    // Exclui o Cliente
    @RequestMapping(value = "/cliente/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCliente(@PathVariable("id") Long id) {
        Cliente cliente = clienteService.findClienteById(id);
        if (cliente == null) {
            logger.error("Não é possível excluir. Cliente com id {} não encontrado.", id);
            return new ResponseEntity(new CustomErrorType("Não é possível excluir. Cliente com id " + id + " não encontrado."),
                    HttpStatus.NOT_FOUND);
        }
        clienteService.deleteClienteById(id);
        return new ResponseEntity<Cliente>(HttpStatus.NO_CONTENT);
    }

    // Exclui todos os Clientes
    @RequestMapping(value = "/cliente/", method = RequestMethod.DELETE)
    public ResponseEntity<Cliente> deleteAllClientes() {
        clienteService.deleteAllClientes();
        return new ResponseEntity<Cliente>(HttpStatus.NO_CONTENT);
    }

}
