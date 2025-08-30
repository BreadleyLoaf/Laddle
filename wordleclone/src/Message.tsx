import React, { use } from 'react';
import cn from 'classnames';
import { useAppSelector } from './store/index.ts';
import styles from './Message.module.css';




export default function Message() {

    const message = useAppSelector((s) => s.game.message);
    const previous = useAppSelector((s) => s.game.prev);

    let ladder = "\n";
    for (let i = 0; i < previous.length - 1; i++) {
        if (previous[i][4] !== previous[i + 1][0]) {
            ladder += previous[i] + " >>> ";
        } else {
            ladder += previous[i] + " -> ";
        }
    }

    if (previous.length > 0) {
        ladder += previous[previous.length - 1]
    }

    ladder += " (" + previous.length + ")";
    return (
        <div className={styles.message}>
            <div className={styles.previous}>
                {message}
            </div>
            <div>
                Current Ladder: {ladder}
            </div>
        </div>
    ) 
    
}