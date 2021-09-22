import styles from "./SendMessage.module.scss";
import { firestore, auth } from "../../data/firebase";
import firebase from "firebase/app";
import { useState } from "react";

function SendMessage({ scrollView }) {
  const messagesRef = firestore.collection("messages");
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();

    await messagesRef.add({
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      message,
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
    });

    setMessage("");
    scrollView.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.sendMessage}>
      <form onSubmit={handleSend}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="type..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default SendMessage;
