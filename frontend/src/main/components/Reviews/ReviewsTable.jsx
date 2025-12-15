import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useNavigate } from "react-router";
import { useBackendMutation } from "main/utils/useBackend";
import {
  cellToAxiosParamsDelete,
  onDeleteSuccess,
  cellToAxiosParamsModerate,
  onModerateSuccess,
  cellToAxiosParamsVote,
  onVoteSuccess,
} from "main/utils/Reviews";
import { Button } from "react-bootstrap";

export default function ReviewsTable({
  reviews,
  userOptions,
  moderatorOptions,
  showModerationStatus,
}) {
  const navigate = useNavigate();

  const editCallback = (cell) => {
    navigate(`/reviews/edit/${cell.row.original.id}`);
  };

  // Stryker disable all
  const deleteMutation = useBackendMutation(
    cellToAxiosParamsDelete,
    { onSuccess: onDeleteSuccess },
    ["/api/reviews/userReviews", "/api/reviews/needsmoderation"],
  );
  // Stryker restore all

  // Stryker disable next-line all
  const deleteCallback = async (cell) => {
    deleteMutation.mutate(cell);
  };

  // Stryker disable all
  const approveMutation = useBackendMutation(
    (cell) => cellToAxiosParamsModerate(cell, "APPROVED"),
    { onSuccess: onModerateSuccess },
    ["/api/reviews/needsmoderation"],
  );

  const rejectMutation = useBackendMutation(
    (cell) => cellToAxiosParamsModerate(cell, "REJECTED"),
    { onSuccess: onModerateSuccess },
    ["/api/reviews/needsmoderation"],
  );

  const approveCallback = async (cell) => {
    approveMutation.mutate(cell);
  };

  const rejectCallback = async (cell) => {
    rejectMutation.mutate(cell);
  };

  const voteMutation = useBackendMutation(
    cellToAxiosParamsVote,
    { onSuccess: onVoteSuccess },
    // Re-fetch these endpoints to update the vote count
    [
      "/api/reviews/all",
      "/api/reviews/userReviews",
      `/api/reviews/approved/forItem/${reviews?.[0]?.item?.id || 0}`, // Attempt to refresh item reviews if applicable
    ],
  );

  const voteCallback = async (cell) => {
    voteMutation.mutate(cell);
  };
  // Stryker restore all

  const columns = [
    {
      Header: "Item Id",
      accessor: "item.id",
    },
    {
      Header: "Item Name",
      accessor: "item.name",
    },
    {
      Header: "Score",
      accessor: "itemsStars",
      Cell: ({ value }) => "⭐".repeat(value),
    },
    {
      Header: "Votes",
      accessor: "voteCount",
      Cell: ({ cell }) => (
        <Button
          variant="outline-primary"
          onClick={() => voteCallback(cell)}
          size="sm"
          data-testid={`ReviewsTable-cell-row-${cell.row.index}-col-Vote-button`}
        >
          👍 {cell.value || 0}
        </Button>
      ),
    },
    {
      Header: "Comments",
      accessor: "reviewerComments",
    },
    {
      Header: "Image",
      accessor: "imageBase64",
      Cell: ({ value }) =>
        value ? (
          <img
            src={value}
            alt="Review"
            style={{ width: "100px", height: "auto" }}
          />
        ) : (
          "None"
        ),
    },
    {
      Header: "Date Served",
      accessor: "dateItemServed",
      Cell: ({ value }) => (
        <span>{new Date(value).toLocaleDateString("en-US")}</span>
      ),
    },
    {
      Header: "Dining Commons Code",
      accessor: "item.diningCommonsCode",
    },
  ];

  if (userOptions) {
    columns.push(ButtonColumn("Edit", "primary", editCallback, "Reviewstable"));
    columns.push(
      ButtonColumn("Delete", "danger", deleteCallback, "Reviewstable"),
    );
  }

  if (moderatorOptions) {
    columns.push(
      ButtonColumn("Approve", "primary", approveCallback, "Reviewstable"),
    );
    columns.push(
      ButtonColumn("Reject", "danger", rejectCallback, "Reviewstable"),
    );
  }

  if (showModerationStatus) {
    const statusColumn = {
      Header: "Status",
      accessor: "status",
    };
    columns.push(statusColumn);
  }
  return <OurTable data={reviews} columns={columns} testid={"Reviewstable"} />;
}
