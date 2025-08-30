import { type PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import WORD_LIST from "./wordlist.json";
import { type TypedUseSelectorHook, useSelector } from "react-redux";

export type Game = {
    target: string;
    guesses: string[];
    prev: string[];
    input: string;
    gameOver: boolean;
    won: number;
    message?: string;
};

const initialState: Game = {
    target: "XXXXX",
    guesses: [],
    prev: [],
    input: "",
    gameOver: false,
    won: 0,
    message: "Welcome to Laddle! Start a new game to begin.",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start(_state, action: PayloadAction<number>) {
      const targetWords = WORD_LIST.target;
      const target = targetWords[action.payload % targetWords.length];
      return {
        target,
        guesses: [],
        prev: [],
        input: "",
        gameOver: false,
        won: 0,
        message: "Welcome to Laddle! every new word starts with the last letter of your previous word. solve as many as you can!"
      };
    },

    inputLetter(state, action: PayloadAction<string>) {
        if (state.input.length <5) {
            state.input = state.input + action.payload;
            console.log(state.input);
        }
    },

    deleteLetter(state) {
        if (state.input.length > 0) {
            state.input = state.input.substring(0, state.input.length - 1);
        }
    },

    guessWord(state) {
        console.log(state.target)
        const input = state.input.toUpperCase();
        if (input.length !== 5) {
            return;
        }
        if (!WORD_LIST.valid.includes(input)) {
            return;
        }
        state.guesses.push(input);
        state.input = "";
        if (input === state.target) {
            state.prev.push(input);
            state.won += 1;
            state.guesses = [];
            const newTargetWords = WORD_LIST.target.filter(
                (word: string) => word[0].toUpperCase() === input[4].toUpperCase()
            )
            console.log(newTargetWords);
            if (newTargetWords.length > 0) {
                let index = Math.floor(Math.random() * newTargetWords.length)
                while(state.prev.includes(newTargetWords[index])) {
                    let new_Index = index + 1;
                    if (new_Index >= newTargetWords.length) {
                        new_Index = 0;
                    }
                    if (new_Index === index) {
                        state.target = WORD_LIST.target[Math.floor(Math.random() * WORD_LIST.target.length)];
                        state.message = "No more words starting with that letter. Starting a new ladder!";
                        return;
                    } else {
                        state.message = "Correct! Your previous word was: " + input;
                        state.target = WORD_LIST.target[Math.floor(Math.random() * WORD_LIST.target.length)];
                        return;
                    }
                }
                state.target = newTargetWords[index];
                state.message = "Correct! Your previous word was: " + input;
                return;
            } 

        } else if (state.guesses.length >= 6) {
            state.gameOver = true;
        }
    }
  },
});

export const gameAction = gameSlice.actions;

export const store = configureStore({
    reducer: {
        game: gameSlice.reducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;