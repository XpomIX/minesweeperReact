import { useEffect, useState } from 'react';
import { Cell } from './cell/cell.lib';
import './minesweeper.css';
import CellComponent from './cell/cell.component';
import Header from './components/header/header.component';
import Modal from './components/modal/modal.component';

const BOARD_HEIGHT = 15;
const BOARD_WIDTH = 30;
const MINES_AMOUNT = 70;
const CELL_SIZE = 40;

export const gameStates = {
	isPlaying: 0,
	lose: 1,
	win: 2
}

const initBoard = () => {
	let board = new Array(BOARD_HEIGHT);
	for (var i = 0; i < BOARD_HEIGHT; i++) {
		board[i] = new Array(BOARD_WIDTH);
	}
	for (let i = 0; i < BOARD_HEIGHT; i++) {
		for (let j = 0; j < BOARD_WIDTH; j++) {
			board[i][j] = new Cell();
		}
	}
	return board;
}

var interval;

const Minesweeper = () => {
	const [isFirstStep, setIsFirstStep] = useState(true);
	const [board, setBoard] = useState(initBoard);
	const [flagsLeft, setFlagsLeft] = useState(MINES_AMOUNT);
	const [gameState, setGameState] = useState(gameStates.isPlaying);
	const [gameDuration, setGameDuration] = useState(0);

	useEffect(() => {
		document.addEventListener('contextmenu', (event) => event.preventDefault(), false);
		interval = setInterval(() => setGameDuration(gameDuration => gameDuration + 1), 1000);
	}, []);

	useEffect(() => {
		if (!(gameState === gameStates.isPlaying)) {
			clearInterval(interval);
		}
	}, [gameState])

	const restart = () => {
		clearInterval(interval);
		setIsFirstStep(true);
		setBoard(initBoard);
		setFlagsLeft(MINES_AMOUNT);
		setGameState(gameStates.isPlaying);
		setGameDuration(0);
		interval = setInterval(() => setGameDuration(gameDuration => gameDuration + 1), 1000);
	}

	const checkWin = () => {
		let foundUnopenedCells = 0;
		let foundFlaggedMines = 0;
		for (let i = 0; i < BOARD_HEIGHT; i++) {
			for (let j = 0; j < BOARD_WIDTH; j++) {
				if ((!board[i][j].isBomb()) && (!board[i][j].opened)) {
					foundUnopenedCells++;
				}
				if (board[i][j].isBomb() && board[i][j].marked) {
					foundFlaggedMines++;
				}
			}
		}
		return foundUnopenedCells === 0 && foundFlaggedMines === MINES_AMOUNT;
	}

	const generateMines = (index1, index2) => {
		let boardCopy = board;
		let totalMines = 0;
		while (totalMines < MINES_AMOUNT) {
			for (let i = 0; i < BOARD_HEIGHT; i++) {
				for (let j = 0; j < BOARD_WIDTH; j++) {
					if (((i !== index1) && (j !== index2)) && (Math.random() * 100 < 3) && (!boardCopy[i][j].isBomb())) {
						boardCopy[i][j].turnToBomb();
						totalMines = totalMines + 1;
					}
					if (totalMines === MINES_AMOUNT) { break }
				}
				if (totalMines === MINES_AMOUNT) { break }
			}
		}
		return boardCopy;
	}

	const initCellValues = (boardCopy) => {
		// Changing the value of adjacent cells to mines
		for (let i = 0; i < BOARD_HEIGHT; i++) {
			for (let j = 0; j < BOARD_WIDTH; j++) {
				if (boardCopy[i][j].isBomb()) {
					// check neighboring cells

					for (let iw = -1; iw <= 1; iw++) {
						for (let jh = -1; jh <= 1; jh++) {
							// check out of index
							if (((BOARD_HEIGHT > i + iw) && (i + iw >= 0)) && ((BOARD_WIDTH > j + jh) && (j + jh >= 0))) {
								if (!boardCopy[i + iw][j + jh].isBomb()) {
									boardCopy[i + iw][j + jh].increaseValue();
								}
							}
						}
					}
				}
			}
		}
		return boardCopy;
	}

	const openNeighboringEmpty = (boardCopy) => {
		let cellOpened = false;
		do {
			cellOpened = false;
			for (let i = 0; i < BOARD_HEIGHT; i++) {
				for (let j = 0; j < BOARD_WIDTH; j++) {
					if ((boardCopy[i][j].value === 0) && (boardCopy[i][j].opened) && (!boardCopy[i][j].checked)) {
						for (let iw = -1; iw <= 1; iw++) {
							for (let jh = -1; jh <= 1; jh++) {
								if (((BOARD_HEIGHT > i + iw) && (i + iw >= 0)) && ((BOARD_WIDTH > j + jh) && (j + jh >= 0))) {
									if (!boardCopy[i + iw][j + jh].isBomb() && !boardCopy[i + iw][j + jh].opened) {
										boardCopy[i + iw][j + jh].open();
										cellOpened = true;
									}
								}
							}
						}
						boardCopy[i][j].checked = true;
					}
				}
			}
		} while (cellOpened);
	}

	const changeOneCell = (index1, index2, changedCell) => {
		setBoard([
			...board.slice(0, index1),
			[...board[index1].slice(0, index2), changedCell, ...board[index1].slice(index2 + 1, board[index1].length)],
			...board.slice(index1 + 1, board.length)
		]);
	}

	const changeWholeBoard = (boardCopy) => {
		setBoard([...boardCopy]);
	}

	const firstStep = (index1, index2) => {
		let updatedBoard = initCellValues(generateMines(index1, index2));
		step(index1, index2, updatedBoard);
	}

	const step = (index1, index2, boardCopy = board) => {
		let pressedCell = boardCopy[index1][index2];
		pressedCell.open();

		if (pressedCell.value === 0) {
			openNeighboringEmpty(boardCopy);
			changeWholeBoard(boardCopy);
		} else {
			if (!pressedCell.isBomb()) {
				changeOneCell(index1, index2, pressedCell);
			} else {
				setGameState(gameStates.lose);

				let currentCell;
				for (let i = 0; i < BOARD_HEIGHT; i++) {
					for (let j = 0; j < BOARD_WIDTH; j++) {
						if (boardCopy[i][j].isBomb()) {
							boardCopy[i][j].open();
						}
					}
				}
				changeWholeBoard(boardCopy);
			}
		}
		if (checkWin()) {
			setGameState(gameStates.win);
		}
	}

	const handleClickLMB = (index1, index2) => {
		if (gameState === gameStates.isPlaying) {
			if (isFirstStep) {
				firstStep(index1, index2);
				setIsFirstStep(false);
			} else {
				step(index1, index2);
			}
		}
	}

	const handleClickRMB = (index1, index2) => {
		if (gameState === gameStates.isPlaying) {

			let pressedCell = board[index1][index2];
			if (!pressedCell.opened) {
				if (pressedCell.marked) {
					pressedCell.mark();
					setFlagsLeft(flagsLeft => flagsLeft + 1);
				} else {
					if (flagsLeft !== 0) {
						pressedCell.mark();
						setFlagsLeft(flagsLeft => flagsLeft - 1);
						if (checkWin()) {
							setGameState(gameStates.win);
						}
					}
				}
				changeOneCell(index1, index2, pressedCell);
			}

		}
	}

	const renderCell = (item, index1, index2) => (
		<CellComponent
			opened={item.opened}
			value={item.value}
			type={item.type}
			handleClickLMB={handleClickLMB}
			handleClickRMB={handleClickRMB}
			pos={[index1, index2]}
			key={`${index1},${index2}`}
			marked={item.marked}
			size={CELL_SIZE}
		/>
	)

	const renderBoard = () => (
		<>
			{board.map((item, index) => {
				return (
					<div className={'minesweeper-content-row'} key={`${index}`}>
						{item.map((item, subindex) => renderCell(item, index, subindex))}
					</div>
				)
			})}
		</>
	)

	return (
		<div className={'minesweeper'} style={{ width: `${CELL_SIZE * BOARD_WIDTH}px` }}>
			<Header gameState={gameState} minesLeft={flagsLeft} handleRestart={restart} time={gameDuration} />
			<div className={'minesweeper-content'}>
				<Modal gameState={gameState} time={gameDuration} />
				{renderBoard()}
			</div>
		</div>
	);
}

export default Minesweeper;
