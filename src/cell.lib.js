export const cellTypes = {
	bomb: 0,
	cell: 1
}
export class Cell {
	constructor() {
		this.type = cellTypes.cell;
		this.value = 0;
		this.opened = false;
	}

	turnToBomb() { this.type = cellTypes.bomb }

	isBomb() { return this.type === cellTypes.bomb }

	increaseValue() { this.value++ }

	open() { this.opened = true }
}