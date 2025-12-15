# UCSB Dining Social Upgrades - Feature Documentation

This document outlines the implementation details of the new social features added to the UCSB Dining application.

## 1. Photo Uploads for Reviews

Allows users to attach a photo when submitting a review.

### Implementation Details:
*   **Database**: Added `imageBase64` (TEXT) column to the `reviews` table.
*   **Backend**: 
    *   Updated `Review` entity with `imageBase64` field.
    *   Updated `ReviewController.postReview` to accept `imageBase64` parameter.
    *   Images are currently stored as Base64 strings directly in the database (suitable for small-scale demos).
*   **Frontend**: 
    *   Updated `ReviewForm` to include a file input.
    *   Added logic to convert selected file to Base64 string.
    *   Updated `ReviewsTable` to display a thumbnail of the image if present.

## 2. Review Voting (Upvotes)

Allows users to vote on reviews they find helpful.

### Implementation Details:
*   **Database**: 
    *   Created `review_votes` table to track unique user votes per review.
    *   `reviews` table calculates `voteCount` dynamically.
*   **Backend**: 
    *   Created `ReviewVote` entity and `ReviewVoteRepository`.
    *   Added `@Formula` to `Review` entity to auto-calculate `voteCount`.
    *   Added `POST /api/reviews/{id}/vote` endpoint in `ReviewController` to toggle votes.
*   **Frontend**: 
    *   Updated `ReviewsTable` to include a "Votes" column.
    *   Added a button that shows the current count and allows toggling the vote.
    *   Real-time updates via React Query mutations.

## 3. Favorites (Dining Commons & Menu Items)

Allows users to favorite specific dining commons or menu items.

### Implementation Details:
*   **Database**: 
    *   Created `user_favorites` table.
*   **Backend**: 
    *   Created `UserFavorite` entity and `UserFavoriteRepository`.
    *   Created `UserFavoriteController` with endpoints:
        *   `GET /api/favorites/all`: List user's favorites.
        *   `POST /api/favorites/commons`: Toggle favorite for a dining hall.
        *   `POST /api/favorites/menuitem`: Toggle favorite for a menu item (by name).
*   **Frontend**: 
    *   Updated `MenuItemTable` to include a "Favorite" button.
    *   Integration with backend to toggle status.

## How to Test

1.  **Start the App**: Ensure backend (`mvn spring-boot:run`) and frontend (`npm start`) are running.
2.  **Upload Photo**: Go to a menu item, write a review, select an image file, and submit. Check the review list for the image.
3.  **Vote**: In the review list, click the "👍" button on any review. The count should update.
4.  **Favorite**: In the menu item list, click the "Favorite" button.

## Future Improvements

*   **Image Storage**: Move from Base64/Database storage to S3 or similar cloud storage for scalability.
*   **User Interface**: Add a dedicated "My Favorites" page.
*   **Sorting**: Allow sorting reviews by vote count.

