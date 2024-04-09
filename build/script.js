import { Game } from "./Game.js";
import { Word } from "./Word.js";
const wordsCollection = new Word(["JUEGO", "TALAR", "BAILE", "ANDAR", "MONTE", "PLAYA", "PLATA", "ARBOL", "QUESO"]);
const pickedWord = wordsCollection.getRandomWord();
const game = new Game(pickedWord);
document.addEventListener("keydown", (e) => {
    game.handleKeyInput(e.key);
});
document.querySelectorAll(".key").forEach(button => {
    button.addEventListener("click", (event) => {
        const target = event.target;
        let key = target.getAttribute('value');
        if (key) {
            if (key.startsWith("Key")) {
                key = key.substring(3);
            }
            game.handleKeyInput(key);
        }
    });
});
