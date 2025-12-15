package edu.ucsb.cs156.dining.repositories;

import edu.ucsb.cs156.dining.entities.User;
import edu.ucsb.cs156.dining.entities.UserFavorite;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFavoriteRepository extends CrudRepository<UserFavorite, Long> {
  Iterable<UserFavorite> findAllByUser(User user);

  Optional<UserFavorite> findByUserAndDiningCommonsCode(User user, String diningCommonsCode);

  Optional<UserFavorite> findByUserAndMenuItemName(User user, String menuItemName);
}
