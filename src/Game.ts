import { UIChanger } from "./UIChanger.js";
import { LetterHandler } from "./LetterHandler.js";

export class Game implements LetterHandler {
    #pickedWord: string;
    #currentGuess: string[];
    #turn: number;
    #userInterface: UIChanger;

    constructor(pickedWord: string) {
        this.#pickedWord = pickedWord.toUpperCase();
        this.#currentGuess = Array(5).fill("");
        this.#turn = 1;
        this.#userInterface = new UIChanger();
    }

    isLetterInWord(letter: string): boolean {
        return this.#pickedWord.includes(letter);
    }

    isLetterCorrect(letter: string, position: number): boolean {
        return this.#pickedWord[position] === letter;
    }

    isLetterMisplaced(letter: string, position: number): boolean {
        return this.#pickedWord.includes(letter) && this.#pickedWord[position] !== letter;
    }

    addLetterToGuess(letter: string): void {
        const nextEmptyIndex = this.#currentGuess.indexOf("");
        if (nextEmptyIndex !== -1) {
            this.#currentGuess[nextEmptyIndex] = letter;
            this.#userInterface.setLetter(this.#turn, nextEmptyIndex, letter);
        }
    }

    removeLetterFromGuess(): void {
        const filledPositions = this.#currentGuess.map((letter, index) => letter ? index : -1).filter(index => index !== -1);
        const lastFilledIndex = filledPositions.length > 0 ? filledPositions[filledPositions.length - 1] : -1;

        if (lastFilledIndex >= 0) {
            this.#currentGuess[lastFilledIndex] = "";
            this.#userInterface.clearLetter(this.#turn, lastFilledIndex);
        }
    }

    resetCurrentGuess(): void {
        this.#currentGuess.fill("");
    }

    handleKeyInput(key: string) {
        if (key === "Enter") {
            this.submitGuess();
        } else if (key === "Backspace") {
            this.removeLetterFromGuess();
        } else if (this.#currentGuess.includes("") && key.length === 1 && key.match(/[a-zñ]/i)) {
            this.addLetterToGuess(key.toUpperCase());
        }
    }

    private submitGuess() {
        if (this.#currentGuess.includes("")) return;

        const guess = this.#currentGuess.join("");
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            let status = "absent";
            if (this.isLetterCorrect(letter, i)) {
                status = "correct";
            } else if (this.isLetterMisplaced(letter, i)) {
                status = "present";
            }
            this.#userInterface.markLetter(this.#turn, i, status);
            this.#userInterface.updateKeyAppearance("Key" + letter, status);
        }

        if (guess === this.#pickedWord) {
            window.location.assign("/winner.html");
        } else if (this.#turn === 6) {
            window.location.assign("/loser.html");
        } else {
            this.#turn++;
            this.#currentGuess.fill("");
        }
    }
}
