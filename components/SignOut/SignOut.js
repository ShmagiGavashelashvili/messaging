import { auth } from "../../data/firebase";
import styles from "./signout.module.scss";

function SignOut() {
  return (
    auth.currentUser && (
      <div className={styles.signout}>
        <button onClick={async () => await auth.signOut()}>Sign Out</button>
      </div>
    )
  );
}

export default SignOut;
