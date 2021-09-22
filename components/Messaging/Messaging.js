import styles from "./Messaging.module.scss";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../data/firebase";
import SingleMessage from "../MessageBox/SingleMessage";
import SendMessage from "../SendMessage/SendMessage";
import { useRef } from "react";
import SignOut from "../SignOut/SignOut";

function Messaging() {
  const scrollView = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });

  return (
    <>
      <div
        className={styles.messaging}
        style={{
          overflowY: messages && messages.length >= 5 ? "scroll" : null,
        }}
      >
        {messages &&
          messages.map((message) => (
            <SingleMessage key={message.id} {...message} />
          ))}
        <span ref={scrollView}></span>
      </div>
      <SendMessage scrollView={scrollView} />
    </>
  );
}

export default Messaging;
