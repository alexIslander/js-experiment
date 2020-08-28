import { IResolvers  } from "apollo-server-express";
import { ListingInput } from "./types";
import { listings, Listing } from "../../listings";

export const listingResolvers: IResolvers = {  
  Query: {    
    listings: (): Listing[] => {
      return listings;
    }
  },
  Mutation: {
    addListing: (_root: undefined, { listing }: { listing: ListingInput }): Listing => {        
      const newListing = {
        id: listing.id, 
        title: listing.title, 
        image: listing.image,
        price: Number(listing.price),
        numOfGuests: listing.numOfGuests            
      } as Listing;
      listings.push(newListing);
      return newListing;
    },
    deleteListing: (_root: undefined, { id }: { id: string }): Listing => {
        for (let i = 0; i < listings.length; i++) {
          if (listings[i].id === id) {
            return listings.splice(i, 1)[0];
          }
        }
    
        throw new Error("failed to deleted listing");
      }
  }
};