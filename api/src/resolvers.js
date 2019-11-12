/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    me(_, __, { models }) {
      return models.User.findOne();
    },
    pet(_, { input }, { models }) {
      return models.Pet.findOne(input);
    },
    pets(_, { input }, { models }) {
      return models.Pet.findMany(input);
    }
  },
  Mutation: {
    addUser(_, { input }, { models }) {
      return models.User.createUser(input);
    },
    addPet(_, { input }, { models }) {
      return models.Pet.create(input);
    },
    updatePet(_, { input }, { models }) {
      return models.Pet.update(input.id, input.updates);
    }
  },
  Pet: {
    img(pet) {
      return pet.type === "DOG"
        ? "https://placedog.net/300/300"
        : "http://placekitten.com/300/300";
    },
    owner(_, __, { user }) {
      return user;
    }
  },
  User: {
    pets(_, __, { models }) {
      return models.Pet.findMany();
    }
  }
};
