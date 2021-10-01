import firebase from "firebase/app";
import styles from "./signin.module.scss";
import { auth, firestore } from "../../data/firebase";

function SignIn({ users }) {
  const usersCol = firestore.collection("users");
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider).then((user) => {
      if (users.length > 0 && users.some((currUser) => currUser.uid === user.user.uid)) {
        console.log("equals");
      } else {
        usersCol
          .add({
            userName: user.user.displayName,
            uid: user.user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            if (typeof window !== "undefined") {
              localStorage.setItem("user", user.user.uid);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className={styles.signin}>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default SignIn;
