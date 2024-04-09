export class UIChanger {
    getCell(turn, position) {
        const row = document.getElementById(`row_${turn}`);
        return row ? row.children[position] : null;
    }
    setLetter(turn, position, letter) {
        const cell = this.getCell(turn, position);
        if (cell) {
            cell.textContent = letter;
        }
    }
    clearLetter(turn, position) {
        const row = document.getElementById(`row_${turn}`);
        if (row && position < row.children.length) {
            row.children[position].textContent = "";
        }
    }
    updateKeyAppearance(keyCode, status) {
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
    markLetter(turn, position, status) {
        const cell = this.getCell(turn, position);
        if (cell) {
            cell.classList.remove("cell-green", "cell-orange", "cell-grey");
            switch (status) {
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
