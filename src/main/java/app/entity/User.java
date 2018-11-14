package app.entity;

import javax.validation.constraints.Size;
import javax.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Size(min = 3, max = 80)
    @Column(name = "username", nullable = false)
    private String username;

    @Size(min = 4, max = 80)
    @Column(name = "password", nullable = false)
    private String password;

    @Transient
    @Column(nullable = false, updatable = false)
    private String passwordCheck;

    @Column(name = "role")
    private String role;

    public User() {
    }

    public User(String username, String password, String role) {
        super();
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordCheck() {
        return passwordCheck;
    }

    public void setPasswordCheck(String passwordCheck) {
        this.passwordCheck = passwordCheck;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
