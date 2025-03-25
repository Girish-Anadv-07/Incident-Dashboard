import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { IncidentsModel } from "./models/Incidents";
import { Severity, Status } from "./types/incident";

dotenv.config();

const NUM_RECORDS = 1000;
const now = new Date();

const getRandomEnumValue = <T extends Record<string, string | number>>(
  enumObj: T
): T[keyof T] => {
  const values = Object.values(enumObj) as (string | number)[];
  const index = Math.floor(Math.random() * values.length);
  return values[index] as T[keyof T];
};

const capitalize = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1);

const seedIncidents = async () => {
  await mongoose.connect(process.env.MONGO_URI || "");
  console.log("Connected to MongoDB");

  await IncidentsModel.deleteMany();
  console.log("Existing incidents cleared");

  const incidents = Array.from({ length: NUM_RECORDS }, () => {
    const createdAt = faker.date.recent({
      days: 10,
      refDate: "2025-01-01T00:00:00.000Z",
    });
    const updatedAt = faker.date.between({ from: createdAt, to: new Date() });

    return {
      title: `${capitalize(faker.hacker.noun())} Issue`,
      description: `There is a problem with ${faker.hacker.noun()} causing unexpected behavior. Please investigate the root cause.`,
      status: getRandomEnumValue(Status),
      severity: getRandomEnumValue(Severity),
      createdAt,
      updatedAt,
    };
  });

  await IncidentsModel.insertMany(incidents);
  console.log(`Seeded ${NUM_RECORDS} incidents`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");
};

seedIncidents();
