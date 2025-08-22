import styles from "./Keyboard.module.css";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { gameAction, useAppSelector } from "./store/index.ts";
import { useEffect } from "react";
import { colourKeys } from "./functions";

const CHAR_CODE_A = "A".charCodeAt(0);
const CHAR_CODE_Z = "Z".charCodeAt(0);

export default function Keyboard() {

    const dispatch = useDispatch();

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();
            if (event.shiftKey || event.ctrlKey || event.altKey) {
                return;
            } else if (key.length === 1 && key >= "A" && key <= "Z") {
                dispatch(gameAction.inputLetter(key));
            } else if (key === "ENTER") {
                dispatch(gameAction.guessWord());
            } else if (key === "BACKSPACE") {
                dispatch(gameAction.deleteLetter());
            }
        };

        window.addEventListener("keydown", handler);
        return() => window.removeEventListener("keydown", handler);
    },  [dispatch]);

    return (
        <div className={styles.keyboard}>
            <div className={styles.row}>
                <Key char="Q" />
                <Key char="W" />
                <Key char="E" />
                <Key char="R" />
                <Key char="T" />
                <Key char="Y" />
                <Key char="U" />
                <Key char="I" />
                <Key char="O" />
                <Key char="P" />
            </div>
            <div className={styles.row}>
                <Key char="A" />
                <Key char="S" />
                <Key char="D" />
                <Key char="F" />
                <Key char="G" />
                <Key char="H" />
                <Key char="J" />
                <Key char="K" />
                <Key char="L" />
            </div>
            <div className={styles.row}>
                <Key char="DEL" wide />
                <Key char="Z" />
                <Key char="X" />
                <Key char="C" />
                <Key char="V" />
                <Key char="B" />
                <Key char="N" />
                <Key char="M" />
                <Key char="✓" wide />
            </div>
        </div>
    )
}

type KeyProps = {
    char: string;
    wide?: boolean;
}

function Key(props: KeyProps) {
    const dispatch = useDispatch();
    const target = useAppSelector((s) => s.game.target)
    const guesses = useAppSelector((s) => s.game.guesses);

    const charCode = props.char.charCodeAt(0);
    const isLetter = charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z;
    let colour = "";
    if (isLetter) {
        colour = colourKeys(props.char, target, guesses);
    }

    

    return (
        <button className={cn(styles.key, props.wide && styles.wide)}>
            {props.char}        
        </button>
    );
}
