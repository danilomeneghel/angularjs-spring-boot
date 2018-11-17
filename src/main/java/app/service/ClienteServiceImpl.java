package app.service;

import app.entity.Cliente;
import app.repository.ClienteRepository;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl {

    @Autowired
    private final ClienteRepository repository;

    @Autowired
    public ClienteServiceImpl(ClienteRepository repository) {
        this.repository = repository;
    }

    public Cliente findClienteById(Long id) {
        return repository.findById(id).orElse(new Cliente());
    }

    public List<Cliente> findAllByOrderByNomeAsc() {
        return repository.findAllByOrderByNomeAsc();
    }

    public Cliente findByNome(String nome) {
        return repository.findByNome(nome);
    }

    public void saveCliente(Cliente cliente) {
        repository.save(cliente);
    }

    public void updateCliente(Cliente cliente) {
        repository.save(cliente);
    }

    public void deleteClienteById(Long id) {
        repository.deleteById(id);
    }

    public void deleteAllClientes() {
        repository.deleteAll();
    }

    public boolean isClienteExist(Cliente cliente) {
        return findByNome(cliente.getNome()) != null;
    }

    public Cliente addRisk(Cliente cliente) {
        int res1 = cliente.getRendMensal().compareTo(new BigDecimal("2000"));
        int res2 = cliente.getRendMensal().compareTo(new BigDecimal("8000"));

        if (res1 <= 0) {
            cliente.setRisco("C");
        } else if (res1 > 0 && res2 <= 0) {
            cliente.setRisco("B");
        } else {
            cliente.setRisco("A");
        }

        return cliente;
    }

}
