import styles from "./userList.module.scss";

const UsersList = ({ user, selectUser, authUser }) => {
  return (
    <li
      onClick={() => selectUser(user)}
      className={styles.userlistItem}
      style={{
        display: user.uid === authUser.uid ? "none" : "block",
      }}
    >
      {user.userName}
    </li>
  );
};

export default UsersList;
