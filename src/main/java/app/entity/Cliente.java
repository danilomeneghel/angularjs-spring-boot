package app.entity;

import java.math.BigDecimal;
import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;

@Entity
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(min = 3)
    @Column(name = "nome")
    private String nome;

    @DecimalMin(value = "1")
    @Column(name = "rend_mensal", precision = 10, scale = 2)
    private BigDecimal rendMensal;

    @Column(name = "risco")
    private String risco;

    @Column(name = "endereco")
    private String endereco;

    public Cliente() {
    }

    public Cliente(String nome, BigDecimal rendMensal, String endereco) {
        super();
        this.nome = nome;
        this.rendMensal = rendMensal;
        this.endereco = endereco;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getRendMensal() {
        return rendMensal;
    }

    public void setRendMensal(BigDecimal rendMensal) {
        this.rendMensal = rendMensal;
    }

    public String getRisco() {
        return risco;
    }

    public void setRisco(String risco) {
        this.risco = risco;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

}
