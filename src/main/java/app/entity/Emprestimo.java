package app.entity;

import javax.persistence.*;

public class Emprestimo {
    
    @Transient
    @Column(nullable = false, updatable = false)
    private Double valor = 0.0;
    
    @Transient
    @Column(nullable = false, updatable = false)
    private Integer periodoMensal = 0;
    
    @Transient
    @Column(updatable = false)
    private Double total = 0.0;
    
    @Transient
    @Column(updatable = false)
    private String cliente = "";
    
    public Emprestimo() {
    }

    public Emprestimo(Double valor, Integer periodoMensal) {
        super();
        this.valor = valor;
        this.periodoMensal = periodoMensal;
    }
    
    public Emprestimo(Double valor, Integer periodoMensal, Double total, String cliente) {
        super();
        this.valor = valor;
        this.periodoMensal = periodoMensal;
        this.total = total;
        this.cliente = cliente;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Integer getPeriodoMensal() {
        return periodoMensal;
    }

    public void setPeriodoMensal(Integer periodoMensal) {
        this.periodoMensal = periodoMensal;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }
    
}
