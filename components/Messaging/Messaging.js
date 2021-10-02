import styles from "./Messaging.module.scss";
import { firestore, auth } from "../../data/firebase";
import SingleMessage from "../MessageBox/SingleMessage";
import SendMessage from "../SendMessage/SendMessage";
import { useRef, useState, useEffect } from "react";
import UsersList from "../UserList/UserList";

function Messaging({ users, authUser }) {
  const scrollView = useRef();
  const messagesRef = firestore.collection("messages");
  const [limit, setLimit] = useState(10);
  const [messages, setMessages] = useState([]);
  const [startChat, setStartChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [showUserList, setShowUserList] = useState(false);

  const getMessages = async (user) => {
    await messagesRef.orderBy("createdAt").onSnapshot((response) => {
      let data = [];
      response.forEach((doc) => {
        if (
          (doc.data().userId_1 === authUser.uid && doc.data().userId_2 === user.uid) ||
          (doc.data().userId_1 === user.uid && doc.data().userId_2 === authUser.uid)
        ) {
          data.push(doc.data());
        }
      });
      setMessages(data);
      scrollView.current.scrollIntoView({ behavior: "smooth" });
    });
  };

  const selectUser = (user) => {
    setStartChat(true);
    setSelectedUser(user);
    getMessages(user);
  };

  const showUserListHandler = () => {
    setShowUserList(!showUserList);
    setStartChat(false);
  };

  return (
    <div className={styles.messaging_container}>
      <ul className={styles.messaging_container_userList}>
        <div className={styles.messaging_container_dropdown} onClick={showUserListHandler}>
          <p>All Conversations</p>
          <span>&#x21E9;</span>
        </div>
        {users &&
          authUser &&
          showUserList &&
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

      <div className={styles.messaging_wrapper}>
        <div className={styles.messaging_wrapper_header}>
          {startChat && <p>message to - {selectedUser.userName}</p>}
        </div>

        {startChat ? (
          <div
            className={styles.messaging}
            style={{ overflowY: messages && messages.length >= 5 ? "scroll" : null }}
          >
            {messages &&
              startChat &&
              showUserList &&
              messages.map((message, index) => (
                <SingleMessage key={`${message.id}_${index}_uid`} {...message} />
              ))}
            <span ref={scrollView}></span>
          </div>
        ) : (
          <div className={styles.messaging}></div>
        )}
        {startChat && <SendMessage authUser={authUser} selectedUser={selectedUser} scrollView={scrollView} />}
      </div>
    </div>
  );
}

export default Messaging;
