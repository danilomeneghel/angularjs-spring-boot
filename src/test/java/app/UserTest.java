/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app;

import app.entity.User;
import app.service.UserServiceImpl;
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
public class UserTest {

    @Autowired
    UserServiceImpl userService;

    public UserTest() {
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
    public void createUsuario() {
        // Cria objeto usuário
        User user = new User("Usuario", "Senha", "USER");

        // Valida id do usuário
        assertNull(user.getId());
        
        // Verifica se o usuário já existe
        userService.isUserExist(user);
        
        // Localiza usuário
        userService.findUserById(user.getId());

        // Lista todos os usuários
        userService.findAllUsers();

        // Salva os dados
        userService.saveUser(user);
    }
    
    @Test
    public void deleteUser() {
        Long id = new Long(1);
        
        // Deleta usuário
        userService.deleteUserById(id);
        
    }
}
