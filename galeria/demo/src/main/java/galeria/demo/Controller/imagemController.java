package galeria.demo.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import galeria.demo.Model.imagemModel;
import galeria.demo.Service.imagemService;

@RestController

@CrossOrigin (origins = "*")

@RequestMapping("api/galeria")
public class imagemController {
    @Autowired
    private imagemService service;

    @GetMapping
    public List <imagemModel> listarTodasAsImagens(){
        return service.listarImagens();
    }

    @GetMapping("/{id}")
    public ResponseEntity <imagemModel> buscarImagemPorID(@PathVariable Long id){
        return service.buscarImagemPorID(id).map(ResponseEntity :: ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public imagemModel salvarImagens(@RequestBody imagemModel imagem){
        return service.salvarImagem(imagem);
    }

    @PutMapping ("/{id}")
    public ResponseEntity <imagemModel> atualizarImagem (@PathVariable Long id, @RequestBody imagemModel imagemModel){
        if(!service.buscarImagemPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }
        imagemModel.setId(id);
        return ResponseEntity.ok(service.salvarImagem(imagemModel));
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity <Void> deletarAluno(@PathVariable Long id){
        if(!service.buscarImagemPorID(id).isPresent()){
            return ResponseEntity.notFound().build();
        }

        service.deletarImagem(id);
        return ResponseEntity.noContent().build();
    }
}
