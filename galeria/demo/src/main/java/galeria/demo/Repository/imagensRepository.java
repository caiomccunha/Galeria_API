package galeria.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import galeria.demo.Model.imagemModel;

@Repository
public interface imagensRepository extends JpaRepository <imagemModel, Long> {

}
