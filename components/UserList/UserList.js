const UsersList = ({ user, selectUser, authUser }) => {
  return (
    <li
      onClick={() => selectUser(user)}
      style={{
        cursor: "pointer",
        margin: ".5rem",
        backgroundColor: "indigo",
        width: "15rem",
        display: user.uid === authUser.uid ? "none" : "block",
      }}
    >
      {user.userName}
    </li>
  );
};

export default UsersList;
