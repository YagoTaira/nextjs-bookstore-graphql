import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    price: Float!
    imageUrl: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  input AddBookInput {
    title: String!
    author: String!
    description: String
    price: Float!
    imageUrl: String
  }

  type Mutation {
    addBook(input: AddBookInput!): Book!
    deleteBook(id: ID!): Book!
  }
`;
