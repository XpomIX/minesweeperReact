export const cellTypes = {
	bomb: 0,
	cell: 1
}
export const markTypes = {
	notMarked: 0,
	flag: 1,
	question: 2
}
export class Cell {
	constructor() {
		this.type = cellTypes.cell;
		this.value = 0;
		this.opened = false;
		this.marked = markTypes.notMarked;
		this.checked = false;
	}

	turnToBomb() {
		this.type = cellTypes.bomb;
		this.value = -1;
	}

	isBomb() { return this.type === cellTypes.bomb }

	increaseValue() { this.value++ }

	open() { this.opened = true }

	mark() {
		if (!this.opened) {
			switch (this.marked) {
				case markTypes.notMarked:
					this.marked = markTypes.flag;
					break;

				case markTypes.flag:
					this.marked = markTypes.question;
					break;

				case markTypes.question:
					this.marked = markTypes.notMarked;
					break;
			}
		}
	}
}