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
@Entity(name = "review_votes")
@EntityListeners(AuditingEntityListener.class)
public class ReviewVote {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "review_id", nullable = false)
  private Review review;

  @CreatedDate
  @Column(updatable = false)
  private LocalDateTime timestamp;
}
