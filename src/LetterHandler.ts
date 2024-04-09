export interface LetterHandler {
    isLetterInWord(letter: string): boolean;
    isLetterCorrect(letter: string, position: number): boolean;
    isLetterMisplaced(letter: string, position: number): boolean;
    addLetterToGuess(letter: string): void;
    removeLetterFromGuess(): void;
    resetCurrentGuess(): void;
}