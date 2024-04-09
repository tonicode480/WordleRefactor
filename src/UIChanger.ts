export class UIChanger {

    private getCell(turn: number, position: number): HTMLElement | null {
        const row = document.getElementById(`row_${turn}`);
        return row ? row.children[position] as HTMLElement : null;
    }

    setLetter(turn: number, position: number, letter: string) {
        const cell = this.getCell(turn, position);
        if (cell) {
            cell.textContent = letter;
        }
    }

    clearLetter(turn: number, position: number) {
        const row = document.getElementById(`row_${turn}`);
        if (row && position < row.children.length) {
            row.children[position].textContent = "";
        }
    }
    

    updateKeyAppearance(keyCode: string, status: string) {
        const keyElement = document.querySelector(`.key[value="${keyCode}"]`);
        if (keyElement) {
            keyElement.classList.remove("cell-green", "cell-orange", "cell-grey");
            switch (status) {
                case "correct":
                    keyElement.classList.add("cell-green");
                    break;
                case "present":
                    keyElement.classList.add("cell-orange");
                    break;
                case "absent":
                    keyElement.classList.add("cell-grey");
                    break;
            }
        }
    }

    markLetter(turn: number, position: number, status: string) {
        const cell = this.getCell(turn, position);
        if (cell) {
            cell.classList.remove("cell-green", "cell-orange", "cell-grey");
            switch(status) {
                case "correct":
                    cell.classList.add("cell-green");
                    break;
                case "present":
                    cell.classList.add("cell-orange");
                    break;
                case "absent":
                    cell.classList.add("cell-grey");
                    break;
            }
        }
    }
}
