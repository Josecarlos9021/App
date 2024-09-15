package com.example.Library.Repositorio;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Library.Entidade.Emprestimo;

// Estende JpaRepository para operação de banco de dados:
@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    // Método para contar empréstimo ativo de um usuário específico
    Long countByUsuarioIdAndEntregaRealizada(Long usuarioid, boolean entregaRealizada);
    // Método para buscar empréstimos de um usuário específico com uma determinada entrega realizada
    List<Emprestimo> findAllByUsuarioIdAndEntregaRealizada(Long usuarioId, boolean entregaRealizada);
    
    Emprestimo findOneByUsuarioIdAndLivroIdAndEntregaRealizada(Long usuario, Long livro, boolean entregaRealizada);
    List<Emprestimo> findByUsuarioIdAndEntregaRealizadaFalse(Long usuarioId);

}