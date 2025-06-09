import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

const fetchGraphQL: FetchFunction = async (operation, variables) => {
  const isServer = typeof window === "undefined";

  const response = await fetch(
    isServer ? "http://localhost:3000/api/graphql" : "/api/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    }
  );

  return await response.json();
};

export const RelayEnvironment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});
