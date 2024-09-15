package com.example.Library.Servicos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Library.Entidade.Emprestimo;
import com.example.Library.Entidade.Livro;
import com.example.Library.Entidade.Usuario;
import com.example.Library.Repositorio.BookRepository;
import com.example.Library.Repositorio.EmprestimoRepository;
import com.example.Library.Repositorio.LibraryRepository;
import com.example.Library.Repositorio.UserRepository;

@Service
public class LibraryService {
    
    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private EmprestimoRepository emprestimoRepository;

    public List<Livro> listarLivrosDisponivelGenero(String genero) {
        return libraryRepository.findByGeneroAndDisponivelEmprestimo(genero, true);
    }

    public void cadastrarUsuario(Usuario usuario) {
        try {
            userRepository.save(usuario);
        } catch (Exception exception) {
            throw new RuntimeException("Erro ao cadastrar usuário: " + exception.getMessage());
        }
    }

    public void cadastrarLivro(Livro livro, Long usuarioId) {
        /* Usuario usuario = userRepository.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        
        if (usuario.getEmprestimos().size() >= 10) {
            throw new IllegalArgumentException("Número máximo de livros cadastrados atingido");
        } */
        try {
            bookRepository.save(livro);
        } catch (Exception exception) {
            throw new RuntimeException("Erro ao cadastrar livro: " + exception.getMessage());
        }
    }

    public Usuario getInfoUsuario(Long usuarioId) {
        return userRepository.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
    }

    // Verifica se o usuário já possui 3 livros emprestados antes de permitir um novo empréstimo.
    public boolean usuarioPossuiTresLivrosEmprestados(Long usuarioId) {
        // Conta quantos empréstimos ativos o usuário possui
        Long countEmprestimos = this.emprestimoRepository.countByUsuarioIdAndEntregaRealizada(usuarioId, false);
        return countEmprestimos >= 3;
    }

    // O método realizarEmprestimo mantém a lógica de limite de 3 livros emprestados por usuário.
    public String realizarEmprestimo(Emprestimo emprestimo) {
        Usuario usuario = userRepository.findById(emprestimo.getUsuario().getId()).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        Livro livro = bookRepository.findById(emprestimo.getLivro().getId()).orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));
        
         if (!livro.isDisponivelEmprestimo()) {
            return "Atenção: Livro não está disponível para empréstimo";
        
        }
        if (usuarioPossuiTresLivrosEmprestados(usuario.getId())) {
            return "Atenção: Número máximo de livros emprestados atingido";
        }

        for (Emprestimo emprestimoExistente : usuario.getEmprestimos()) {
            // equals em Java é usado para comparar dois objetos e determinar se eles são iguais
            if (emprestimoExistente.getLivro().equals(livro)) {
                return "Atenção: Você já possui esse livro emprestado";
        }
    }
        
        Emprestimo novoEmprestimo = new Emprestimo();
        novoEmprestimo.setUsuario(usuario);
        novoEmprestimo.setLivro(livro);
        novoEmprestimo.setEntregaRealizada(false); 

        livro.setDisponivelEmprestimo(false);

        try {
            bookRepository.save(livro);
            usuario.getEmprestimos().add(novoEmprestimo);
            emprestimoRepository.save(novoEmprestimo);
        } catch (Exception exception) {
            throw new RuntimeException("Erro ao realizar empréstimo: " + exception.getMessage());
        }

        return "Livro emprestado com sucesso";
    }

    public String realizarDevolucao(Long usuarioId, Long livroId) {
        // O método começa buscando o Usuario e o Livro pelos seus respectivos IDs. Se o ID não for encontrado, manda uma exceção (tratamento de erro)
        Usuario usuario = userRepository.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        // Utiliza os repositórios userRepository e livroRepositorio para obter esses dados. Se o ID não for encontrado, manda uma exceção (tratamento de erro)
        Livro livro = bookRepository.findById(livroId).orElseThrow(() -> new IllegalArgumentException("Livro não encontrado"));
        
        // O objetivo é encontrar um empréstimo específico do usuário que corresponda ao livro a ser devolvido e que ainda não tenha sido devolvido.
        // Inicializa a variável emprestimoEncontrado como null. Esta variável será usada para armazenar o empréstimo que estamos procurando.
        Emprestimo emprestimoEncontrado = null;

        // Usa um for (loop) para iterar sobre todos os empréstimos associados ao usuário.
        for (Emprestimo emprestimo : usuario.getEmprestimos()) {
            // emprestimo.getLivro().equals(livro) verifica se o livro associado ao empréstimo é igual ao livro que está sendo devolvido.
            // emprestimo.isEntregaRealizada(): Verifica se o empréstimo ainda não foi finalizado (ou seja, o livro ainda não foi devolvido).
            if (emprestimo.getLivro().equals(livro) && !emprestimo.isEntregaRealizada()) {
                emprestimoEncontrado = emprestimo;
                break;
            }
        }

        if (emprestimoEncontrado == null) {
            return "Você não possui esse livro emprestado ou ele já foi devolvido.";
        }

        livro.setDisponivelEmprestimo(true);
        try {
            bookRepository.save(livro);
            emprestimoEncontrado.setEntregaRealizada(true);
            emprestimoRepository.save(emprestimoEncontrado);
        } catch (Exception exception) {
            throw new RuntimeException("Erro ao realizar devolução: " + exception.getMessage());
        }

        return "Livro devolvido com sucesso";
    }

    public List<Usuario> getUsuarios() {
        return userRepository.findAll();
    }

    public List<Livro> getLivros() {
        return bookRepository.findAll();
    }

    public boolean usuarioEmprestimoNaoEntregues(Long usuarioId) {
        List<Emprestimo> emprestimosNaoEntregues = emprestimoRepository.findByUsuarioIdAndEntregaRealizadaFalse(usuarioId);
        return !emprestimosNaoEntregues.isEmpty();
    }
}