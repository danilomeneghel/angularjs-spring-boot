/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app;

import app.entity.Cliente;
import app.service.ClienteServiceImpl;
import java.math.BigDecimal;
import org.junit.After;
import org.junit.AfterClass;
import static org.junit.Assert.assertNull;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Danilo
 */
public class ClienteControllerTest {

    @Autowired
    ClienteServiceImpl clienteService;

    public ClienteControllerTest() {
    }

    @BeforeClass
    public static void setUpClass() {
    }

    @AfterClass
    public static void tearDownClass() {
    }

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    @Test
    public void createCliente() {
        // Cria objeto cliente
        Cliente cliente = new Cliente("Cliente", new BigDecimal("2000.50"), "Endereço");

        // Valida id do cliente
        assertNull(cliente.getId());
        
        // Verifica se o cliente já existe
        clienteService.isClienteExist(cliente);
        
        // Localiza cliente
        clienteService.findClienteById(cliente.getId());

        // Lista todos os clientes
        clienteService.findAllByOrderByNomeAsc();

        // Adiciona o risco
        clienteService.addRisk(cliente);

        // Salva os dados
        clienteService.saveCliente(cliente);
    }
    
    @Test
    public void deleteCliente() {
        // Deleta cliente
        clienteService.deleteClienteById(new Long(1));        
    }
}
