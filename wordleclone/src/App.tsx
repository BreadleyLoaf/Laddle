
import { useEffect } from "react";
import styles from "./app.module.css"
import Board from "./Board";
import Keyboard from "./Keyboard";
import Message from "./Message";
import Alert from "./Alert";
import { gameAction, useAppSelector } from "./store";
import WORDLIST from "./store/wordlist.json";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const dispatch = useDispatch();
  const won = useAppSelector((s) => s.game.won);

  useEffect(() => {
    dispatch(gameAction.start(Date.now()))
  }, [dispatch])

  return (
    <div className={styles.app}>
      <Alert />
      <h1 className={styles.title}>🪜 LADDLE 🪜</h1>
      <Board />
      <p className={styles.statusText}>Current score: {won}</p>
      <Keyboard />
      <Message />
    </div>
  );
}