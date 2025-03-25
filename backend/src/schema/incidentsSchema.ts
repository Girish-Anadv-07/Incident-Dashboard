import { gql } from "apollo-server";

export const typeDefs = gql`
  enum Severity {
    CRITICAL
    HIGH
    MEDIUM
    LOW
  }

  enum Status {
    NEW
    IN_PROGRESS
    RESOLVED
    CLOSED
  }

  enum SortOrder {
    ASC
    DESC
  }

  input DateRangeInput {
    from: String
    to: String
  }

  type Query {
    getIncidents(
      page: Int
      limit: Int
      status: [Status]
      severity: [Severity]
      createdRange: DateRangeInput
      updatedRange: DateRangeInput
      sortField: String
      sortOrder: SortOrder
    ): IncidentPage!
  }

  type Incident {
    id: ID!
    title: String!
    description: String!
    status: Status!
    severity: Severity!
    createdAt: String!
    updatedAt: String!
  }

  type IncidentPage {
    incidents: [Incident!]!
    totalCount: Int!
  }

  type Mutation {
    addIncident(
      title: String!
      description: String!
      severity: Severity!
      status: Status!
    ): Incident!

    updateIncident(
      id: ID!
      title: String
      description: String
      severity: Severity
      status: Status
    ): Incident!

    deleteIncident(id: ID!): Boolean!
  }
`;
