const { ApolloServer, gql } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const users = require('./utils/User')

const typeDefs = gql`
    type Query {
        name: String
        age: Int
        isSingle: Boolean
        numbers: [Int!]!
        location: Location
        users: [User!]!
    }

    type Location {
        state: String!
        city: String!
    }

    type User {
        id: ID!
        name: String!
        age: Int!
        location: Location
    }

    type Mutation {
        addUser(name: String, age: Int!): [User!]!
        deleteUser(id: ID!): [User!]!
        updateUser(id: ID!, name: String, age: Int): User
    }

    type Subscription {
        update: User!
    }
`;

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation,
        Subscription
    },
    context: {
        users,
        pubsub
    }
});

server.listen().then(({ url }) => {
    console.log(`Server start at ${url}`);
});
