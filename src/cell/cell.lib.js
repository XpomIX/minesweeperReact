export const cellTypes = {
	bomb: 0,
	cell: 1
}
export class Cell {
	constructor() {
		this.type = cellTypes.cell;
		this.value = 0;
		this.opened = false;
		this.marked = false;
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
			this.marked = !this.marked
		}
	}
}