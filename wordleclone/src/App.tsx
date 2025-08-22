import styles from "./app.module.css"
import Board from "./Board";
import Keyboard from "./Keyboard";

export default function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>LADDLE</h1>
      <Board />
      <p className={styles.statusText}>Current score:</p>
      <Keyboard />
    </div>
  );
}