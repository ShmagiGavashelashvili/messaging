import Head from "next/head";
import Messaging from "../components/Messaging/Messaging";
import styles from "../styles/Home.module.scss";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../data/firebase";
import SignIn from "../components/SignIn/SignIn";
import SignOut from "../components/SignOut/SignOut";
import { useEffect, useState } from "react";

export default function Home() {
  const [user] = useAuthState(auth);
  const usersCol = firestore.collection("users");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    await usersCol.onSnapshot((response) => {
      let data = [];
      response.forEach((doc) => {
        data.push(doc.data());
      });
      setUsers(data);
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        Message Box{" "}
        {user && <span style={{ fontSize: ".8rem", color: "green" }}> - logged as {user.displayName}</span>}
      </h1>
      {user ? (
        <>
          <Messaging users={users} authUser={user} />
          <SignOut />
        </>
      ) : (
        <SignIn users={users} />
      )}
    </div>
  );
}
