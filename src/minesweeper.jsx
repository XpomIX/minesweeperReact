import { useEffect, useState } from 'react';
import { Cell } from './cell.lib';
import './minesweeper.css';
import CellComponent from './cell.component';

const BOARD_HEIGHT = 15;
const BOARD_WIDTH = 30;
const MINES_AMOUNT = 70;

const Minesweeper = () => {
	const [isLose, setIsLose] = useState(false);
	const [board, setBoard] = useState(() => {
		// Init array
		let board = new Array(BOARD_HEIGHT);
		for (var i = 0; i < BOARD_HEIGHT; i++) {
			board[i] = new Array(BOARD_WIDTH);
		}
		for (let i = 0; i < BOARD_HEIGHT; i++) {
			for (let j = 0; j < BOARD_WIDTH; j++) {
				board[i][j] = new Cell();
			}
		}


		// Place Mines
		let totalMines = 0;
		while (totalMines < MINES_AMOUNT) {
			for (let i = 0; i < BOARD_HEIGHT; i++) {
				for (let j = 0; j < BOARD_WIDTH; j++) {
					if (Math.random() * 100 < 3) {
						board[i][j].turnToBomb();
						totalMines++;
					}
					if (totalMines === MINES_AMOUNT) { break }
				}
				if (totalMines === MINES_AMOUNT) { break }
			}
		}

		// Changing the value of adjacent cells to mines

		for (let i = 0; i < BOARD_HEIGHT; i++) {
			for (let j = 0; j < BOARD_WIDTH; j++) {
				if (board[i][j].isBomb()) {
					// check neighboring cells

					for (let iw = -1; iw <= 1; iw++) {
						for (let jh = -1; jh <= 1; jh++) {
							// check out of index
							if (((BOARD_HEIGHT > i + iw) && (i + iw >= 0)) && ((BOARD_WIDTH > j + jh) && (j + jh >= 0))) {
								if (!board[i + iw][j + jh].isBomb()) {
									board[i + iw][j + jh].increaseValue();
								}
							}
						}
					}
				}
			}
		}

		return board;
	});

	const handleClick = (pos1, pos2) => {
		let pressedCell = board[pos1][pos2];
		pressedCell.open();
		if (!pressedCell.isBomb()) {
			setBoard([
				...board.slice(0, pos1),
				[...board[pos1].slice(0, pos2), pressedCell, ...board[pos1].slice(pos2 + 1, board[pos1].length)],
				...board.slice(pos1 + 1, board.length)
			])
		} else {
			setIsLose(true);
		}
	}

	const renderCell = (item, index, subindex) => (
		<CellComponent
			opened={item.opened}
			value={item.value}
			type={item.type}
			boardWidth={BOARD_HEIGHT}
			handleClick={handleClick}
			pos={[index, subindex]}
		/>
	)

	const renderBoard = () => (
		<>
			{board.map((item, index) => {
				return (
					<div className={'minesweeper-row'}>
						{item.map((item, subindex) => renderCell(item, index, subindex))}
					</div>
				)
			})}
		</>
	)

	return (
		<div className={'minesweeper'}>
			{isLose ? 'Ты проиграл' : renderBoard()}
		</div>
	);
}

export default Minesweeper;
