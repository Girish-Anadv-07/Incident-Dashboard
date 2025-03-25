import { IncidentsModel } from "../models/Incidents";
import { Status, Severity } from "../types/incident";
import { statusSortOrder, severitySortOrder } from "../types/incident";

interface DateRange {
  from: string;
  to: string;
}

interface GetIncidentsArgs {
  page?: number;
  limit?: number;
  status?: [Status];
  severity?: [Severity];
  createdRange?: DateRange;
  updatedRange?: DateRange;
  sortField?: string;
  sortOrder?: "ASC" | "DESC";
}

export const resolvers = {
  Query: {
    getIncidents: async (_: any, args: GetIncidentsArgs) => {
      const {
        page = 1,
        limit = 10,
        status,
        severity,
        createdRange,
        updatedRange,
        sortField = "createdAt",
        sortOrder = "DESC",
      } = args;

      const skip = (page - 1) * limit;
      const filters: any = {};

      if (status?.length) {
        filters.status = { $in: status };
      }

      if (severity?.length) {
        filters.severity = { $in: severity };
      }

      if (createdRange) {
        filters.createdAt = {
          $gte: new Date(createdRange.from),
          $lte: new Date(createdRange.to),
        };
      }

      if (updatedRange) {
        filters.updatedAt = {
          $gte: new Date(updatedRange.from),
          $lte: new Date(updatedRange.to),
        };
      }

      // Fetch all matching incidents for custom sorting
      let incidents = await IncidentsModel.find(filters).lean();

      // Apply custom in-memory sort
      if (sortField === "status") {
        incidents.sort(
          (a, b) =>
            (statusSortOrder[a.status] - statusSortOrder[b.status]) *
            (sortOrder === "ASC" ? 1 : -1)
        );
      } else if (sortField === "severity") {
        incidents.sort(
          (a, b) =>
            (severitySortOrder[a.severity] - severitySortOrder[b.severity]) *
            (sortOrder === "ASC" ? 1 : -1)
        );
      } else {
        // Default Mongo sort for other fields
        incidents.sort((a, b) => {
          const aVal = a[sortField as keyof typeof a];
          const bVal = b[sortField as keyof typeof b];
          if (aVal < bVal) return sortOrder === "ASC" ? -1 : 1;
          if (aVal > bVal) return sortOrder === "ASC" ? 1 : -1;
          return 0;
        });
      }

      // Paginate after sorting
      const paginated = incidents.slice(skip, skip + limit).map((incident) => ({
        ...incident,
        id: incident._id.toString(),
      }));
      const totalCount = await IncidentsModel.countDocuments(filters);

      return {
        incidents: paginated,
        totalCount,
      };
    },
  },

  Mutation: {
    addIncident: async (_: any, args: any) => await IncidentsModel.create(args),
    updateIncident: async (_: any, { id, ...updates }: any) =>
      await IncidentsModel.findByIdAndUpdate(id, updates, { new: true }),
    deleteIncident: async (_: any, { id }: any) => {
      await IncidentsModel.findByIdAndDelete(id);
      return true;
    },
  },
};
