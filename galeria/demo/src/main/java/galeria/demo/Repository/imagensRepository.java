package galeria.demo.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface imagensRepository extends JpaRepository <imagensModel, Long> {

}
