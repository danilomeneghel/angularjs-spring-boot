package app.repository;

import app.entity.Cliente;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface ClienteRepository extends CrudRepository<Cliente, Long> {

    Cliente findByNome(String nome);
    List<Cliente> findAllByOrderByNomeAsc();

}
