import React from "react";
import { useBackend } from "main/utils/useBackend";

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ReviewsTable from "main/components/Reviews/ReviewsTable";
import { useCurrentUser } from "main/utils/currentUser";

export default function ReviewsIndexPage() {
  const currentUser = useCurrentUser();

  const {
    data: reviews,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/reviews/all"],
    { method: "GET", url: "/api/reviews/all" },
    [],
  );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>All Reviews</h1>
        <ReviewsTable reviews={reviews} currentUser={currentUser} />
      </div>
    </BasicLayout>
  );
}

