
import { useEffect } from "react";
import styles from "./app.module.css"
import Board from "./Board";
import Keyboard from "./Keyboard";
import Message from "./Message";
import { gameAction, useAppSelector } from "./store";
import WORDLIST from "./store/wordlist.json";
import { useDispatch } from "react-redux";


export default function App() {
  const dispatch = useDispatch();
  const gameOver = useAppSelector((s) => s.game.gameOver);
  const won = useAppSelector((s) => s.game.won);
  const input = useAppSelector((s) => s.game.input);

  useEffect(() => {
    dispatch(gameAction.start(Date.now()))
  }, [dispatch])

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>LADDLE</h1>
      <Board />
      <p className={styles.statusText}>Current score: {won}</p>
      <Keyboard />
      <Message />
    </div>
  );
}