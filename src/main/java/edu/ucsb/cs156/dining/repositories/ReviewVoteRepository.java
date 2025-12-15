package edu.ucsb.cs156.dining.repositories;

import edu.ucsb.cs156.dining.entities.Review;
import edu.ucsb.cs156.dining.entities.ReviewVote;
import edu.ucsb.cs156.dining.entities.User;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewVoteRepository extends CrudRepository<ReviewVote, Long> {
  Optional<ReviewVote> findByUserAndReview(User user, Review review);

  long countByReview(Review review);
}
