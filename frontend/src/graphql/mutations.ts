import { gql } from "@apollo/client";

export const ADD_INCIDENT = gql`
  mutation AddIncident(
    $title: String!
    $description: String!
    $severity: Severity!
    $status: Status!
  ) {
    addIncident(
      title: $title
      description: $description
      severity: $severity
      status: $status
    ) {
      id
      title
      description
      severity
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_INCIDENT = gql`
  mutation UpdateIncident(
    $id: ID!
    $title: String
    $description: String
    $severity: Severity
    $status: Status
  ) {
    updateIncident(
      id: $id
      title: $title
      description: $description
      severity: $severity
      status: $status
    ) {
      id
      title
      description
      severity
      status
      updatedAt
    }
  }
`;

export const DELETE_INCIDENT = gql`
  mutation DeleteIncident($id: ID!) {
    deleteIncident(id: $id)
  }
`;
