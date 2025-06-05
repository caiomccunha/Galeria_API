package galeria.demo.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import galeria.demo.Model.imagemModel;
import galeria.demo.Repository.imagensRepository;

@Service
public class imagemService {

    @Autowired
    private imagensRepository repository;

    public List<imagemModel> listarImagens (){
        return repository.findAll();
    }

    public Optional <imagemModel> buscarImagemPorID(Long id){
        return repository.findById(id);
    }

    public imagemModel salvarImagem (imagemModel imagem){
        return repository.save(imagem);
    }

    public void deletarImagem(Long id){
        repository.deleteById(id);
    }
    }
