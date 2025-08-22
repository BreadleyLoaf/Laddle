export function colourWord(target: string, guess: string): string {
    const colours: string[] = ["B", "B", "B", "B", "B"];

    const unmatched = new Map<string, number>();
    for (let i = 0; i < target.length; i++) {
        if (target[i] === guess[i]) {
            colours[i] = "G"; // Green for correct letter in correct position
        } else {
            const count = unmatched.get(target[i]) || 0;
            unmatched.set(target[i], count + 1);
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (colours[i] === "G") continue; // Skip already matched letters

        const count = unmatched.get(guess[i]);
        if (count && count > 0) {
            colours[i] = "Y";
            unmatched.set(guess[i], count - 1);
        }
    }
    return colours.join("");
}

const COLOUR_MAP = new Map([
    ["", 0],
    ["B", 1], // Black
    ["Y", 2], // Yellow
    ["G", 3], // Green
]);

export function colourKeys(key: string, target: string, guesses: string[]): string {
    let bestColor = "";

    const colours = guesses.map(guess => colourWord(target, guess));
    for (let i = 0; i < guesses.length; i++) {
        for (let j = 0; j < 5; j++) {
            if (guesses[i][j] === key) {
                const colour = colours[i][j];
                if (COLOUR_MAP.get(colour)! > COLOUR_MAP.get(bestColor)!) {
                    bestColor = colour;
                }
            }
        }
    }

    return bestColor;
}