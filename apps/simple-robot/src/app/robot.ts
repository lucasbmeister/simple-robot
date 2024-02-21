export interface IPosition {
	x: number;
	y: number;
}

export type RobotPartType = 'head' | 'body' | 'arm' | 'leg'

export interface IRobotPart {
	type: RobotPartType
	position: IPosition
}

export class RobotPart {
	type: RobotPartType
	position: IPosition

	constructor(part: IRobotPart) {
		this.type = part.type
		this.position = part.position
	}
}

export interface IRobotConstraint {
	quantity: number
}

export type RobotConstraints = { [key in RobotPartType]: IRobotConstraint }

export interface IRobotSchematic {
	constraints: RobotConstraints
}

export class Robot {
	parts: Array<RobotPart> = []
	constraints: RobotConstraints
	private partsCount: { [key in RobotPartType]: number }

	constructor() {
		this.partsCount = {
			head: 0,
			arm: 0,
			leg: 0,
			body: 0
		}

	}

	addPart(part: IRobotPart) {
		const partCount = this.partsCount[part.type]

		if (partCount >= this.constraints[part.type].quantity) {
			throw new Error(`Can't add more than ${this.constraints[part.type].quantity} of ${part.type}`)
		}

		this.partsCount[part.type]++

		this.parts.push(new RobotPart(part))
	}

	setConstraints(constraints: RobotConstraints) {
		this.constraints = constraints
	}

	static build(schematic: IRobotSchematic) {
		const robot = new Robot()
		robot.setConstraints(schematic.constraints)
		return robot

	}
}