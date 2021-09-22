import styles from "./MessageBox.module.scss";
import { formatRelative } from "date-fns";
import { auth } from "../../data/firebase";

function SingleMessage({ message, user, createdAt, id, userId }) {
  const { uid } = auth.currentUser;
  const formatDate = (date) => {
    let formattedDate = "";
    if (date) {
      formattedDate = formatRelative(date, new Date());

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };

  const messageStyle = userId === uid ? true : false;

  return (
    <div
      className={
        messageStyle ? styles.messageBox_sent : styles.messageBox_revieved
      }
    >
      <div className={styles.messageBox_msgDetail}>
        <h2>
          <p style={{ backgroundColor: messageStyle ? "hotpink" : "grey" }}>
            {messageStyle ? "me" : user.slice(0, 1)}
          </p>
          {createdAt && createdAt.seconds ? (
            <span>{formatDate(new Date(createdAt.seconds * 1000))}</span>
          ) : null}
        </h2>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default SingleMessage;
