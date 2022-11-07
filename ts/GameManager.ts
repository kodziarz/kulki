import Ball, { COLORS } from "./Ball";
import Board from "./Board";
import Field from "./Field";

export default class GameManager {

    private board: Board
    private colors: number[]

    constructor(board: Board) {
        this.board = board
        this.colors = Object.keys(COLORS).map((key) => { return parseInt(key) }).filter((numberKey) => { return !isNaN(numberKey) })
    }

    generateRandomBalls(number: number) {
        let result: Ball[] = []

        for (let i = 0; i < number; i++) {
            result.push(new Ball(this.colors[Math.floor(Math.random() * this.colors.length)]))
        }
        return result
    }

    pickRandomEmptyFields(number: number) {
        let result: { x: number, y: number }[] = []
        let fields: Field[] = []
        this.board.getFields().forEach((column) => {
            column.forEach((field) => { fields.push(field) })
        });
        let xd = fields.filter((field, index) => { console.log("isLegal() [", index, "]: ", field.isLegal()); return field.isLegal() })
        console.log("generateRandomCoords, fields: ", xd);



        for (let i = 0; i < number; i++) {
            result.push({
                x: Math.floor(Math.random() * this.board.getWidth()),
                y: Math.floor(Math.random() * this.board.getHeight())
            })
        }
        return result
    }
}