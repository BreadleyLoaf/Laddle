import styles from './Board.module.css';
import cn from 'classnames';
import { useAppSelector } from './store/index.ts';
import { colourWord } from './functions';
import type { ReactNode } from 'react';

export default function Board() {

    const input = useAppSelector((s) => s.game.input);
    const target = useAppSelector((s) => s.game.target);
    const guesses = useAppSelector((s) => s.game.guesses);
    // const prev = useAppSelector((s) => s.game.prev);
    // const won = useAppSelector((s) => s.game.won);
    // const message = useAppSelector((s) => s.game.message);
    const gameOver = useAppSelector((s) => s.game.gameOver);

    const cells: React.ReactNode[] = [];

    // guessed letters
    for (let i = 0; i < guesses.length; i++) {
        const guess = guesses[i];
        const colours = colourWord(target, guess);
    
        for (let j = 0; j < colours.length; j++) {
            const cell = (
                <div 
                    key={`${i}-${j}`} 
                    className={cn
                    (styles.cell, 
                    colours[j] === "G" && styles.green,
                    colours[j] === "Y" && styles.yellow,
                    colours[j] === "B" && styles.black
                    )}>
                        {guess[j]}
                </div>
            );
            cells.push(cell);
        }
    }

    const showInput = !gameOver;
    if (showInput) {
            for (let i = 0; i < 5; i++) {
        const cell = (
            <div key={`input-${i}`} className={styles.cell}>
            {input[i] ?? ""}
            </div>
        );
        cells.push(cell);
        }
    }
    
    const emptyRows = 6 - (showInput ? 1 : 0) - guesses.length;
    for (let i = 0; i < emptyRows* 5; i++) {
        const cell = <div key={i} className={styles.cell} />;
        cells.push(cell);
    }

    return <div className={styles.board}>{cells}</div>
}

