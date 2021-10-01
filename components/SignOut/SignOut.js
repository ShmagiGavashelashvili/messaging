import { auth, firestore } from "../../data/firebase";
import styles from "./signout.module.scss";

function SignOut() {
  const logOut = async () => {
    await auth.signOut();
  };
  return (
    auth.currentUser && (
      <div className={styles.signout}>
        <button onClick={logOut}>Sign Out</button>
      </div>
    )
  );
}

export default SignOut;
