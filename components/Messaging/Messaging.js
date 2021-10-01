import styles from "./Messaging.module.scss";
import { firestore, auth } from "../../data/firebase";
import SingleMessage from "../MessageBox/SingleMessage";
import SendMessage from "../SendMessage/SendMessage";
import { useRef, useState, useEffect } from "react";
import UsersList from "../UserList/UserList";

function Messaging({ users, authUser }) {
  const scrollView = useRef();
  const messagesRef = firestore.collection("messages");
  // const [limit, setLimit] = useState(10);
  const [messages, setMessages] = useState([]);
  const [startChat, setStartChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const getMessages = async () => {
    await messagesRef.orderBy("createdAt").onSnapshot((response) => {
      let data = [];
      response.forEach((doc) => {
        data.push(doc.data());
      });
      setMessages(data);
      scrollView.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  const selectUser = (user) => {
    setStartChat(true);
    setSelectedUser(user);
    getMessages();
  };

  const filteredMessages =
    messages &&
    messages.filter(
      (msg) =>
        (msg.userId_1 === authUser.uid && msg.userId_2 === selectedUser.uid) ||
        (msg.userId_1 === selectedUser.uid && msg.userId_2 === authUser.uid)
    );

  return (
    <div className={styles.messaging_container}>
      <ul>
        {users &&
          users.map((user, index) => {
            return (
              <UsersList
                selectUser={selectUser}
                authUser={authUser}
                key={`${user.uid}_${index}_uid`}
                user={user}
              />
            );
          })}
      </ul>
      {startChat ? (
        <div
          className={styles.messaging}
          style={{ overflowY: messages && messages.length >= 5 ? "scroll" : null }}
        >
          {messages &&
            startChat &&
            filteredMessages.map((message, index) => (
              <SingleMessage key={`${message.id}_${index}_uid`} {...message} />
            ))}
          <span ref={scrollView}></span>
        </div>
      ) : null}
      {startChat ? (
        <SendMessage authUser={authUser} selectedUser={selectedUser} scrollView={scrollView} />
      ) : null}
    </div>
  );
}

export default Messaging;
