import Ball from "./Ball.js"

export default class Field {
    private _isLegal: boolean
    private ball: (Ball | null)
    private readonly x: number
    private readonly y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    isLegal(): boolean {
        return this._isLegal
    }

    getX(): number {
        return this.x
    }

    getY(): number {
        return this.y
    }
}