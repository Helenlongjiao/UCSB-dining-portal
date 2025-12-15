import OurTable, { ButtonColumn } from "main/components/OurTable";
import { hasRole } from "main/utils/currentUser";
import { useNavigate } from "react-router";
import { useBackendMutation } from "main/utils/useBackend";
import {
  cellToAxiosParamsFavorite,
  onFavoriteSuccess,
} from "main/utils/Reviews";

export default function MenuItemTable({ menuItems, currentUser }) {
  const testid = "MenuItemTable";
  const navigate = useNavigate();

  const favoriteMutation = useBackendMutation(
    cellToAxiosParamsFavorite,
    { onSuccess: onFavoriteSuccess },
    // We don't strictly need to refetch menu items since favorite status isn't part of menu item yet
    // but in a real app we might want to refetch user favorites
    ["/api/favorites/all"],
  );

  const favoriteCallback = async (cell) => {
    favoriteMutation.mutate(cell);
  };

  const reviewCallback = async (_cell) => {
    const itemId = _cell.row.original.id;
    navigate(`/reviews/post/${itemId}`);
  };

  const viewCallback = async (_cell) => {
    const itemId = _cell.row.original.id;
    navigate(`/reviews/${itemId}`);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0)
      return "No reviews";
    const validRatings = reviews
      .filter(
        (r) => r && typeof r === "object" && typeof r.itemsStars === "number",
      )
      .map((r) => r.itemsStars);
    if (validRatings.length === 0) return "No ratings";
    const avg = validRatings.reduce((a, b) => a + b, 0) / validRatings.length;
    return avg.toFixed(1);
  };

  const columns = [
    {
      Header: "Item Name",
      accessor: "name",
    },
    {
      Header: "Station",
      accessor: "station",
    },
    {
      Header: "Average Rating",
      accessor: (row) => calculateAverageRating(row.reviews),
      id: "averageRating",
    },
  ];

  if (hasRole(currentUser, "ROLE_USER")) {
    columns.push(
      ButtonColumn("Review Item", "warning", reviewCallback, testid),
    );
    columns.push(ButtonColumn("All Reviews", "warning", viewCallback, testid));
    columns.push(
      ButtonColumn("Favorite", "danger", favoriteCallback, testid),
    );
  }

  return <OurTable columns={columns} data={menuItems} testid={testid} />;
}
