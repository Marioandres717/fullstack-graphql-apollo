const { gql } = require("apollo-server");

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  enum PetType {
    DOG
    CAT
    BIRD
    REPTILE
  }
  type User {
    id: ID!
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    name: String!
    type: PetType!
    createdAt: String!
    img: String
    owner: User!
  }

  type Query {
    me: User!
    pet(input: PetInput): Pet!
    pets(input: PetInput): [Pet]!
  }

  type Mutation {
    addUser(input: UserInput!): User!
    addPet(input: PetInput!): Pet!
    updatePet(input: PetInput!): Pet!
  }

  input PetInput {
    id: String
    name: String
    type: PetType
  }

  input UserInput {
    username: String!
  }
`;

module.exports = typeDefs;
