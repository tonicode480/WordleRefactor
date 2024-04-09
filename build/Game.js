var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Game_pickedWord, _Game_currentGuess, _Game_turn, _Game_userInterface;
import { UIChanger } from "./UIChanger.js";
export class Game {
    constructor(pickedWord) {
        _Game_pickedWord.set(this, void 0);
        _Game_currentGuess.set(this, void 0);
        _Game_turn.set(this, void 0);
        _Game_userInterface.set(this, void 0);
        __classPrivateFieldSet(this, _Game_pickedWord, pickedWord.toUpperCase(), "f");
        __classPrivateFieldSet(this, _Game_currentGuess, Array(5).fill(""), "f");
        __classPrivateFieldSet(this, _Game_turn, 1, "f");
        __classPrivateFieldSet(this, _Game_userInterface, new UIChanger(), "f");
    }
    isLetterInWord(letter) {
        return __classPrivateFieldGet(this, _Game_pickedWord, "f").includes(letter);
    }
    isLetterCorrect(letter, position) {
        return __classPrivateFieldGet(this, _Game_pickedWord, "f")[position] === letter;
    }
    isLetterMisplaced(letter, position) {
        return __classPrivateFieldGet(this, _Game_pickedWord, "f").includes(letter) && __classPrivateFieldGet(this, _Game_pickedWord, "f")[position] !== letter;
    }
    addLetterToGuess(letter) {
        const nextEmptyIndex = __classPrivateFieldGet(this, _Game_currentGuess, "f").indexOf("");
        if (nextEmptyIndex !== -1) {
            __classPrivateFieldGet(this, _Game_currentGuess, "f")[nextEmptyIndex] = letter;
            __classPrivateFieldGet(this, _Game_userInterface, "f").setLetter(__classPrivateFieldGet(this, _Game_turn, "f"), nextEmptyIndex, letter);
        }
    }
    removeLetterFromGuess() {
        const filledPositions = __classPrivateFieldGet(this, _Game_currentGuess, "f").map((letter, index) => letter ? index : -1).filter(index => index !== -1);
        const lastFilledIndex = filledPositions.length > 0 ? filledPositions[filledPositions.length - 1] : -1;
        if (lastFilledIndex >= 0) {
            __classPrivateFieldGet(this, _Game_currentGuess, "f")[lastFilledIndex] = "";
            __classPrivateFieldGet(this, _Game_userInterface, "f").clearLetter(__classPrivateFieldGet(this, _Game_turn, "f"), lastFilledIndex);
        }
    }
    resetCurrentGuess() {
        __classPrivateFieldGet(this, _Game_currentGuess, "f").fill("");
    }
    handleKeyInput(key) {
        if (key === "Enter") {
            this.submitGuess();
        }
        else if (key === "Backspace") {
            this.removeLetterFromGuess();
        }
        else if (__classPrivateFieldGet(this, _Game_currentGuess, "f").includes("") && key.length === 1 && key.match(/[a-zñ]/i)) {
            this.addLetterToGuess(key.toUpperCase());
        }
    }
    submitGuess() {
        var _a;
        if (__classPrivateFieldGet(this, _Game_currentGuess, "f").includes(""))
            return;
        const guess = __classPrivateFieldGet(this, _Game_currentGuess, "f").join("");
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            let status = "absent";
            if (this.isLetterCorrect(letter, i)) {
                status = "correct";
            }
            else if (this.isLetterMisplaced(letter, i)) {
                status = "present";
            }
            __classPrivateFieldGet(this, _Game_userInterface, "f").markLetter(__classPrivateFieldGet(this, _Game_turn, "f"), i, status);
            __classPrivateFieldGet(this, _Game_userInterface, "f").updateKeyAppearance("Key" + letter, status);
        }
        if (guess === __classPrivateFieldGet(this, _Game_pickedWord, "f")) {
            window.location.assign("/winner.html");
        }
        else if (__classPrivateFieldGet(this, _Game_turn, "f") === 6) {
            window.location.assign("/loser.html");
        }
        else {
            __classPrivateFieldSet(this, _Game_turn, (_a = __classPrivateFieldGet(this, _Game_turn, "f"), _a++, _a), "f");
            __classPrivateFieldGet(this, _Game_currentGuess, "f").fill("");
        }
    }
}
_Game_pickedWord = new WeakMap(), _Game_currentGuess = new WeakMap(), _Game_turn = new WeakMap(), _Game_userInterface = new WeakMap();
