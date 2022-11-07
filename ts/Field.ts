import Ball from "./Ball"

export default class Field {
    private _isLegal: boolean
    private ball: (Ball | null) = null
    private readonly x: number
    private readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this._isLegal = true
    }

    isLegal(): boolean {
        return this._isLegal
    }

    getBall() {
        return this.ball
    }

    setBall(newBall: Ball) {
        this.ball = newBall
        this._isLegal = false
    }

    deleteBall() {
        this.ball = null
        this._isLegal = true
    }

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }

    /**
     * Generates {@link Field~Field} instance from JSON data.
     * @param o JSON object which is going to be parsed.
     * @returns {@link Field~Field} object parsed from JSON data.
     */
    static fromJSON = (o: Object): Field => {
        let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {
            if (key == "ball") {
                return [key, Object.assign(new Ball(0), value)]
            }
            return [key, value]
        }))
        return Object.assign(new Field(result.x, result.y), result)
    }
}