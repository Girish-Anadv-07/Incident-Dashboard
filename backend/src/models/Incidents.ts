import mongoose from "mongoose";
import { Status, Severity } from "../types/incident";

const IncidentsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
    },
    severity: {
      type: String,
      enum: Object.values(Severity),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const IncidentsModel = mongoose.model("Incidents", IncidentsSchema);
