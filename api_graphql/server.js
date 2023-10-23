const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const cors = require('cors');

const ClienteModel = require('./db')

const ClienteType = new GraphQLObjectType({
  name: 'Cliente',
  fields: () => ({
    codigo: { type: GraphQLString },
    nombre: { type: GraphQLString },
    telefono: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    cliente: {
      type: new GraphQLList(ClienteType),
      resolve: () => ClienteModel.find(),
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addCliente: {
      type: ClienteType,
      args: {
        codigo: { type: new GraphQLNonNull(GraphQLString) },        
        nombre: { type: new GraphQLNonNull(GraphQLString) },
        telefono: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args) => {
        const cliente = new ClienteModel(args);
        return cliente.save();
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

const app = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
