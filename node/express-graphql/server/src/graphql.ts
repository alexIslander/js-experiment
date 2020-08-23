import { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLFloat, 
    GraphQLNonNull,
    GraphQLList,
    GraphQLInputObjectType } from "graphql";
import { listings } from "./listings";

const Listing = new GraphQLObjectType({
    name: "Listing",
    fields: {
      id: { type: GraphQLNonNull(GraphQLID) },
      title: { type: GraphQLNonNull(GraphQLString) },
      image: { type: GraphQLNonNull(GraphQLString) },
      address: { type: GraphQLNonNull(GraphQLString) },
      price: { type: GraphQLNonNull(GraphQLInt) },
      numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
      numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
      numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
      rating: { type: GraphQLNonNull(GraphQLFloat) }
    }
  });

const ListingInput = new GraphQLInputObjectType({
    name: 'ListingInput',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
        numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
        numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
        rating: { type: GraphQLNonNull(GraphQLFloat) }
    })
  });

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from the Query!"
    },
    listings: {
    type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
    resolve: () => {
        return listings;
      }
  }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addListing: {
        type: GraphQLNonNull(Listing),
        args: { listing: 
            { type: GraphQLNonNull(ListingInput) }
        },        
        resolve: (_root, { listing }) => {
            listings.push(listing);
            return listing;
        }
    },
    deleteListing: {
        type: GraphQLNonNull(Listing),
        args: {
          id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (_root, { id }) => {
          for (let i = 0; i < listings.length; i++) {
            if (listings[i].id === id) {
              return listings.splice(i, 1)[0];
            }
          }
      
          throw new Error("failed to deleted listing");
        }
    }
  }
});

export const schema = new GraphQLSchema({ query, mutation });