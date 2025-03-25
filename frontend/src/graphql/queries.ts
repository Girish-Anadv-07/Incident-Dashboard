import { gql } from "@apollo/client";

export const GET_INCIDENTS = gql`
  query GetIncidents(
    $page: Int!
    $limit: Int!
    $status: [Status]
    $severity: [Severity]
    $createdRange: DateRangeInput
    $updatedRange: DateRangeInput
    $sortField: String
    $sortOrder: SortOrder
  ) {
    getIncidents(
      page: $page
      limit: $limit
      status: $status
      severity: $severity
      createdRange: $createdRange
      updatedRange: $updatedRange
      sortField: $sortField
      sortOrder: $sortOrder
    ) {
      incidents {
        id
        title
        description
        status
        severity
        createdAt
        updatedAt
      }
      totalCount
    }
  }
`;
