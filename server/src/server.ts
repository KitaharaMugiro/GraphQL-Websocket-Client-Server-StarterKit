import { GraphQLServer, PubSub } from 'graphql-yoga'
import { Message, Resolvers } from "./generated/message"

const messages: Message[] = [];
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers: Resolvers = {
  Query: {
    messages: () => messages
  },

  Mutation: {
    postMessage: (parent, args) => {
      const { user, content } = args
      const id = messages.length.toString()
      messages.push({
        id,
        content,
        user
      })
      subscribers.forEach((call) => call())
      return id
    }
  },

  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = "test";
        onMessagesUpdates(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel)
      }
    }
  }


};

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs: ["./src/graphql/message.graphql"], resolvers, context: { pubsub } });
server.start(({ port }) => {
  console.log(`Server on http://localhost:${port}/`);
});