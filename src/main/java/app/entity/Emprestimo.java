package app.entity;

import javax.persistence.*;

public class Emprestimo {

    @Transient
    @Column(nullable = false, updatable = false)
    private Double valor;

    @Transient
    @Column(nullable = false, updatable = false)
    private Integer periodoMensal;

    @Transient
    @Column(updatable = false)
    private Double total;

    public Emprestimo() {
    }

    public Emprestimo(Double valor, Integer periodoMensal, Double total) {
        super();
        this.valor = valor;
        this.periodoMensal = periodoMensal;
        this.total = total;
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

}
