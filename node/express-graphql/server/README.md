CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * Installation
 * Step execution
 * Maintainers


INTRODUCTION
------------

This project is done by The newline Guide to Building Your First GraphQL Server with Node and TypeScript free course. [GitHub Pages] (https://www.newline.co/courses/the-newline-guide-to-building-your-first-graphql-server-with-node-and-typescript)

You learn how to create your first GraphQL server with Node.js and TypeScript.

The code contains slight modifications compare to the original tutorial.


REQUIREMENTS
------------

This module requires no modules outside of NodeJs 12+.


INSTALLATION
------------

Run `npm install` in /server folder


STEP EXECUTION
-------------


 - ## First 101 node js runner

1. Create a folder. (\\MyExampleNodeServer\server) 
2. Within this folder create an 'index.js' file with the following content:
```
console.log("Hello world");
const one = 1;
const two = 2;

console.log(`1 + 2 =${one + two}`);
```
3. Open console and with the help of 'node' command run the server: `node server\index.js`
4. The console displays the output of the code.

- ## First 101 node server example

To manage and install packages published to the registry must contain a package.json file.

A `package.json` file:

lists the packages your project depends on specifies versions of a package that your project can use using semantic versioning rules makes your build reproducible, and therefore easier to share with other developers

1. Create a 'package.json' file in 'server' folder. Run: `npm init`
The minimum content is the 'name' and 'version' tags.
```
{
  "name": "node-graphql-v1-server",
  "version": "1.0.0"
}
```
2. Install 'express' as a dependency: `npm install express`
(check 'package.json' file content -> dependencies section)

2.1 In 'index.ts' setup express remove everything except the variables(one, two)the console.log line:
```
const express = require('express');

const app = express();
const port = 5000;
app.listen(port);

console.log(`[app] : http://localhost:${port}`);
```
Run the project, observe the output.
Then replace the console.log with: 
```
app.get("/", (_req, res) => res.send(`1 + 2 = ${one + two}`));
```

3. Create a helper command within scripts tag in 'packages.json': 
```
"start": "node src/"
```
It can be used via `npm run start` command. You can see your server running.

4. Install 'nodemon' dev dependency for auto restart the server when changes happen in the code: `npm i nodemon -D`
5. Change the helper command within scripts tag in 'packages.json' to: 
```
"start": "nodemon src/"
```

- ## Turn the node server into a typescript project

Add typescript to the project. The code will be translated to plain JS.

6. Add typescript as dev dependency: `npm i typescript ts-node -D`
DefinitelyTyped collection of type definitions. - https://github.com/DefinitelyTyped/DefinitelyTyped
7. Prepare the project to use '.ts' files. Run: `npm install --save-dev @tsconfig/node12`
The tsconfig.json file specifies the root files and the compiler options required to compile the project.
7. Create 'tsconfig.json' with the following content:
```
{
  "extends": "@tsconfig/node12/tsconfig.json",
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./build",
    "strict": true
  }
}
```
[More info:] (https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

**Add dynamic types for node and express**

8. Run: `npm i -D @types/node @types/express`
9. Start to use '.ts' file in the app. Rename 'index.js' to 'index.ts' and change required includes to import.
10. Change the helper command within scripts tag in 'packages.json' to: 
```
"start": "nodemon src/index.ts"
```
And 
```
"main": "src/index.ts" 
```
in root.

10.1 In 'index.ts' the express constant created via 'required' can be replaced with import.
```
import express from "express";
```

- ## Prepare for prod environment

11. Create the helper command within scripts tag in 'packages.json' to: 
```
"build": "tsc -p ./"
```
12. Lint checking. Run: `npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
13. Introduce an .eslintrc.json configuration file in the root project directory. The .eslintrc.json file is the configuration file that'll dictate the ESLint set up of our application.
```
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module"
  },
  "extends": ["plugin:@typescript-eslint/recommended"],
  "env": { "node": true },
  "rules": {
    "indent": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  }
}
```
Be aware of IntelliSense, when you hover over a variable. _variableName rule! Check VsCode 'setting.json' config file.

- ## REST functions

14. Create 'listings.ts' file for a static mock list, next to 'index.ts' with this content:
```
interface Listing {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
  }

export const listings: Listing[] = [
    {
      id: "001",
      title:
        "Clean and fully furnished apartment. 5 min away from CN Tower",
      image:
        "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
      address: "3210 Scotchmere Dr W, Toronto, ON, CA",
      price: 10000,
      numOfGuests: 2,
      numOfBeds: 1,
      numOfBaths: 2,
      rating: 5
    },
    {
      id: "002",
      title: "Luxurious home with private pool",
      image:
        "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
      address:
        "100 Hollywood Hills Dr, Los Angeles, California",
      price: 15000,
      numOfGuests: 2,
      numOfBeds: 1,
      numOfBaths: 1,
      rating: 4
    },
    {
      id: "003",
      title:
        "Single bedroom located in the heart of downtown San Fransisco",
      image:
        "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
      address: "200 Sunnyside Rd, San Fransisco, California",
      price: 25000,
      numOfGuests: 3,
      numOfBeds: 2,
      numOfBaths: 2,
      rating: 3
    }
  ];
```
15. Add a parser to make easy object mapping in the REST calls: Run: npm i body-parser
AND
npm install -D @types/body-parser
16. Import the mock file and the parser into 'index.ts' and make use of it:
```
import { listings } from "./listings";
import bodyParser from "body-parser";
...
app.use(bodyParser.json());
```
17. Create new endpoints:
```
app.get("/", (_req, res) => {
    res.send("node-graphql-v1-server is running...");
  });

app.get("/listings", (_req, res) => {
    res.send(listings);
  });

app.post('/add-listing', (req, res) => {
    const newListItem: Listing = req.body;
    listings.push(newListItem);
    return res.sendStatus(204);
});

app.delete('/delete-listing', (req, res) => {
    const id: string = req.body.id;

    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
        return res.send(listings.splice(i, 1));
        }
    }
});
```
- ## Introduce GraphQL instead of REST
**Add Apollo dependencies**
0. Create your new 'feature/node_express_graphql_apollo' branch from 'feature/node_express_graphql' branch.
1. To install Apollo, run: `npm install apollo-server-express`
2. To install GraphQL, run: `npm install graphql`
3. Finally, install types as dev dependecy, run: `npm i -D @types/graphql`
4. Setup Apollo in 'index.ts' file:
```
import express from "express";
import { ApolloServer } from "apollo-server-express";

const app = express();
const port = 5000;
const server = new ApolloServer();

server.applyMiddleware({ app, path: "/api" });
app.listen(port);

console.log(`[app] : http://localhost:${port}`);
```
Please note the error in ApolloServer, it requires a schema!
5. Create schema in newly created 'server/src/graphql.ts' file:
```
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from the Query!"
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "Hello from the Mutation!"
    }
  }
});

export const schema = new GraphQLSchema({ query, mutation });
```
6. Configure schema in 'server/src/index.ts':
```
import { schema } from './graphql';
...
const server = new ApolloServer({ schema });
```
Note: the error is gone.
7. Run the server: `npm run start` and check the result: `http://localhost:5000/api`
The Playground is present, where 'queries' and 'mutations'(actions) can be run.
8. Try out the playground. Paste and run:
```
query {
  hello
}
```
Press play and the result is displayed.

Paste and run:
```
mutation {
  hello
}
```
You are done. Express app is now prepared with Apollo Server. Now you can interact with the server without curl or Postman make use of the playground.

9. Modify the graphql scheme in 'graphql.ts'. Create a new type:
```
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
```
Import the missing types, to eliminate errors.
After the hello definition introduce 'listings' in the 'query' constants:
```
...
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
  ...
```
Save the changes.
10. Go to the browser and change the query code:
```
query {  
  hello
  listings {
    id
    title
  }
}
```
Press play, and you run your first practical GraphQL quesry!
11. Go back to 'graphql.ts' and introduce 'mutations'. Paste the following code in 'mutation' constant:
```
...
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
...
```
instead of: 
```
  hello: {
    type: GraphQLString,
    resolve: () => "Hello from the Mutation!"
  }
```
12. Go to the browser and and try out the created mutations in the playground, with the following code:
```
mutation {
  addListing (
    listing: {    
      id: "004"
      title: "Clean and fully furnished apartment. 5 min away from CN Tower II."
      image: "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg"
      address: "3210 Scotchmere Dr W, Toronto, ON, CA"
      price: 11000
      numOfGuests: 3
      numOfBeds: 1
      numOfBaths: 2
      rating: 4
    }) {
      id
      title
    }  
#   deleteListing(id: "001") {
#     id
#     title
#   }
}
```
After play, the result return the inserted object's id and title. You can add as many fields you want to return, which exist in 'Listing'.
13. Invert the comment between 'addListing' and 'deleteListing' and remove the first entry from the list.
Then run:
```
query {  
  listings {
    id
    title
    address
    price
    numOfGuests
    numOfBeds
    numOfBaths
    rating
  }
}
```
to check the result.

** Introduce (Apollo) GraphQL Schema **
More elegant and simpler to use 'gql'.
1. Create a 'typeDefs.ts' in newly creted 'graphql' folder:
```
import { gql } from "apollo-server-express";

export interface ListingInput {
    id: string;
    title: string;
    description: string;
    image: string;
    type: string;
    address: string;
    price: number;
    numOfGuests: number;
}

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
```
2. In the same folder create 'resolvers.ts', with this content:
```
import { IResolvers  } from "apollo-server-express";
import { ListingInput } from "./typeDefs";
import { listings, Listing } from "../../listings";

export const resolvers: IResolvers = {  
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
```
3. Since all of the logic has been out sourced from 'graphql.ts' this file can be deleted safely.
4. Import in main 'index.ts' the typeDefs and resolvers:
```
import { typeDefs, resolvers } from './graphql';
````
and configure these in ApolloServer:
```
const server = new ApolloServer({typeDefs, resolvers});
```
Run the project and everything should function as before.

MAINTAINERS
-----------

 * Sandor Csete (AlexIslander) - sandor.csete@gmail.com