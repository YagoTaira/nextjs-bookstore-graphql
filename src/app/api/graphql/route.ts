import { createSchema, createYoga } from "graphql-yoga";
import { typeDefs } from "@/graphql/schema/typeDefs";
import { resolvers } from "@/graphql/resolvers";
import { NextRequest } from "next/server";

import { connectToDatabase } from "@/lib/db";
import { ensureAdminUserExists } from "@/lib/initAdmin";

connectToDatabase().then(() => {
  ensureAdminUserExists().catch(console.error);
});

const yoga = createYoga<{ req: NextRequest }>({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response },
  graphiql: process.env.NODE_ENV === "development",
});

export { yoga as GET, yoga as POST };
