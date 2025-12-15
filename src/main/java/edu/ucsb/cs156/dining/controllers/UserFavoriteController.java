package edu.ucsb.cs156.dining.controllers;

import edu.ucsb.cs156.dining.entities.User;
import edu.ucsb.cs156.dining.entities.UserFavorite;
import edu.ucsb.cs156.dining.repositories.UserFavoriteRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "User Favorites")
@RequestMapping("/api/favorites")
@RestController
@Slf4j
public class UserFavoriteController extends ApiController {

  @Autowired UserFavoriteRepository userFavoriteRepository;

  @Operation(summary = "List all favorites for the current user")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("/all")
  public Iterable<UserFavorite> allFavorites() {
    User user = getCurrentUser().getUser();
    return userFavoriteRepository.findAllByUser(user);
  }

  @Operation(summary = "Toggle favorite for a dining commons")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PostMapping("/commons")
  public Object toggleCommonsFavorite(@Parameter(name = "code") @RequestParam String code) {
    User user = getCurrentUser().getUser();
    Optional<UserFavorite> existing =
        userFavoriteRepository.findByUserAndDiningCommonsCode(user, code);

    if (existing.isPresent()) {
      userFavoriteRepository.delete(existing.get());
      return genericMessage("Favorite removed");
    } else {
      UserFavorite favorite = UserFavorite.builder().user(user).diningCommonsCode(code).build();
      userFavoriteRepository.save(favorite);
      return genericMessage("Favorite added");
    }
  }

  @Operation(summary = "Toggle favorite for a menu item name")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PostMapping("/menuitem")
  public Object toggleMenuItemFavorite(@Parameter(name = "name") @RequestParam String name) {
    User user = getCurrentUser().getUser();
    Optional<UserFavorite> existing = userFavoriteRepository.findByUserAndMenuItemName(user, name);

    if (existing.isPresent()) {
      userFavoriteRepository.delete(existing.get());
      return genericMessage("Favorite removed");
    } else {
      UserFavorite favorite = UserFavorite.builder().user(user).menuItemName(name).build();
      userFavoriteRepository.save(favorite);
      return genericMessage("Favorite added");
    }
  }
}
