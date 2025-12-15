package edu.ucsb.cs156.dining.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "user_favorites")
@EntityListeners(AuditingEntityListener.class)
public class UserFavorite {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  // We can favorite a dining commons OR a specific menu item name
  @Column(name = "dining_commons_code")
  private String diningCommonsCode;

  @Column(name = "menu_item_name")
  private String menuItemName;

  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime createdDate;
}
