import { markTypes } from "./cell/cell.lib";

export const checkWin = (board, minesAmount) => {
    let foundUnopenedCells = 0;
    let foundFlaggedMines = 0;
    let currentCell;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            currentCell = board[i][j];
            if (!currentCell.isBomb() && !(currentCell.opened)) {
                foundUnopenedCells++;
            }
            if (currentCell.isBomb() && currentCell.marked === markTypes.flag) {
                foundFlaggedMines++;
            }
        }
    }
    return foundUnopenedCells === 0 && foundFlaggedMines === minesAmount;
}