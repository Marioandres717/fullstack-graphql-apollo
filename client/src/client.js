import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

// LOCAL SCHEMAS
const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet {
    vaccinated: Boolean
  }
`;

const resolvers = {
  User: {
    age(user, args, context, info) {
      return 25;
    }
  },
  Pet: {
    vaccinated() {
      return false;
    }
  }
};

const http = new HttpLink({ uri: "http://localhost:4000/" });
// using delay network to see the benefits of Optimistic UI
const delay = setContext(
  request =>
    new Promise((success, fail) => {
      setTimeout(() => {
        success();
      }, 800);
    })
);

const link = ApolloLink.from([delay, http]);
const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache, resolvers, typeDefs });

export default client;
