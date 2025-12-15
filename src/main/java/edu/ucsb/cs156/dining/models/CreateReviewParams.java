package edu.ucsb.cs156.dining.models;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReviewParams {
  private long itemId;
  private Long itemsStars;
  private String reviewerComments;
  private LocalDateTime dateItemServed;
  private String imageBase64;
}
