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
    const over = useAppSelector((s) => s.game.gameOver);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            const key = event.key.toUpperCase();
            if (event.shiftKey || event.ctrlKey || event.altKey) {
                return;
            } else if (key.length === 1 && key.charCodeAt(0) >= CHAR_CODE_A && key.charCodeAt(0) <= CHAR_CODE_Z) {
                dispatch(gameAction.inputLetter(key));
            } else if (key === "ENTER") {
                console.log(over);
                if (over) {
                    dispatch(gameAction.start(Date.now()));
                } else {
                    dispatch(gameAction.guessWord());
                }            
            } else if (key === "BACKSPACE") {
                dispatch(gameAction.deleteLetter());
            } else {
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

    const handleClick = () => {
        console.log("clicked " + isLetter, props.char);
        if (isLetter && props.char !== "DEL") {
            dispatch(gameAction.inputLetter(props.char));
        } else if (props.char === "DEL") {
            dispatch(gameAction.deleteLetter());
        } else if (props.char === "✓") {
            dispatch(gameAction.guessWord());
        }
    };

   // console.log(props.char, colour, styles.green, styles.yellow, styles.black);

    return (
        <button 
        onClick={handleClick}
        className={cn(
            styles.key, 
            props.wide && styles.wide,
            colour === "G" && styles.green,
            colour === "Y" && styles.yellow,
            colour === "B" && styles.black,
        )}>
            {props.char}    
        </button>

    );
}
