import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery, useSubscription, useMutation } from '@apollo/client';
import { WebSocketLink } from "@apollo/client/link/ws";
import { useEffect, useState } from 'react';
import WebSocket from "ws"

const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }: any) => {
  const { data } = useSubscription(GET_MESSAGES);
  if (!data) {
    return null;
  }

  return (
    <>
      {data.messages.map(({ id, user: messageUser, content }: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: user === messageUser ? "flex-end" : "flex-start",
            paddingBottom: "1em",
          }}
        >
          {user !== messageUser && (
            <div
              style={{
                height: 50,
                width: 50,
                marginRight: "0.5em",
                border: "2px solid #e5e6ea",
                borderRadius: 25,
                textAlign: "center",
                fontSize: "18pt",
                paddingTop: 5,
              }}
            >
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            style={{
              background: user === messageUser ? "blue" : "#e5e6ea",
              color: user === messageUser ? "white" : "black",
              padding: "1em",
              borderRadius: "1em",
              maxWidth: "60%",
            }}
          >
            {content}
          </div>
        </div>
      ))}
    </>
  );
};

const Page = () => {
  const [state, stateSet] = useState({
    user: "Jack",
    content: "",
  });
  const [postMessage] = useMutation(POST_MESSAGE);
  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state,
      });
    }
    stateSet({
      ...state,
      content: "",
    });
  };
  return (
    <div>
      <Messages user={state.user} />
      <div>

        <input
          value={state.user}
          onChange={(evt) =>
            stateSet({
              ...state,
              user: evt.target.value,
            })} />
      </div>

      <div>
        <input
          value={state.content}
          onChange={(evt) =>
            stateSet({
              ...state,
              content: evt.target.value,
            })
          } />
      </div>

      <button onClick={() => onSend()} style={{ width: "100%" }}>
        Send
          </button>

    </div >
  );
}

export default () => {
  const [client, setClient] = useState(null)
  useEffect(() => {
    const link = new WebSocketLink({
      uri: `ws://localhost:4000/`,
      options: {
        reconnect: true,
      }
    });

    const client = new ApolloClient({
      link,
      uri: "http://localhost:4000/",
      cache: new InMemoryCache(),
    });

    setClient(client)
  }, [])
  if (client === null) return "wait"
  return (
    <ApolloProvider client={client!}>
      <Page />
    </ApolloProvider>
  )
}