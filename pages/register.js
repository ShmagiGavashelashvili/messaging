import firebase from "firebase/app";
import styles from "../styles/SignIn/signin.module.scss";
import { auth, firestore } from "../data/firebase";
import { useState } from "react";
import { useRouter } from "next/router";

function SignIn() {
  const usersCol = firestore.collection("users");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const register = async (e) => {
    e.preventDefault();
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        usersCol
          .add({
            userName: name,
            uid: user.user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            router.push("/");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });

    setEmail("");
    setName("");
    setPassword("");
  };

  return (
    <div className={styles.register}>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={register}>
          Register
        </button>
      </form>
    </div>
  );
}

export default SignIn;
