import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/incidentsSchema";
import { resolvers } from "./resolvers/incidentResolvers";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await server.listen(PORT);
  console.log(`Server running at ${url}`);
};

startServer();
