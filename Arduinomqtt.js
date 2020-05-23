const gql = require("graphql-tag");
const ApolloClient = require("apollo-client").ApolloClient;
const fetch = require("node-fetch");
const createHttpLink = require("apollo-link-http").createHttpLink;
const setContext = require("apollo-link-context").setContext;
const InMemoryCache = require("apollo-cache-inmemory").InMemoryCache;
var mqtt = require('mqtt');

 
const httpLink = createHttpLink({
  uri: "http://159.89.33.196:3000/graphql",
  fetch: fetch
});
 
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


var clientmqtt  = mqtt.connect('mqtt://159.89.33.196');
clientmqtt.on('connect', function () {
    clientmqtt.subscribe('ArduinotDirection');
});
clientmqtt.on('message', function (topic, message) {
sendServerData(message.toString());
});

const sendServerData = async (msg) =>{
  console.log(msg);
  const routeAdd = gql`
  mutation createRouteMap {
    createRouteMap(direction:${msg},date:"2020-05-18T07:56:38.219Z") {
        _id
        direction
        date
      }
    }
  `;
   client.mutate({mutation:routeAdd});
}; 

