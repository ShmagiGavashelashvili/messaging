import firebase from "firebase/app";
import styles from "./signin.module.scss";
import { auth } from "../../data/firebase";

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  };

  return (
    <div className={styles.signin}>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default SignIn;
