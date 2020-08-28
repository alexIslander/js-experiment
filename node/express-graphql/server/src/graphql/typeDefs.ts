import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
}
  
input ListingInput {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
}

  type Query {
    listings: [Listing!]!
  }

  type Mutation {
    addListing(listing: ListingInput): Listing!
    deleteListing(id: String): Listing!
  }
`;