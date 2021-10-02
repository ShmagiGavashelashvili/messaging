import React from "react";
import { useState } from "react";
import { auth } from "../data/firebase";
import { useRouter } from "next/router";
import styles from "../styles/login/login.module.scss";

function login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    await auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        if (user) router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });

    setEmail("");
    setPassword("");
  };
  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button type="submit" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
}

export default login;
