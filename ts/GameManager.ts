import Ball, { COLORS } from "./Ball";
import Board from "./Board";
import Field from "./Field";
import Settings from "./settings.json"

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
        fields = fields.filter((field) => { return field.isLegal() })

        for (let i = 0; i < number; i++) {
            let index = Math.floor(Math.random() * fields.length)
            let field = fields[index]
            result.push({
                x: field.getX(),
                y: field.getY()
            })
            fields.splice(index, 1)
        }
        return result
    }

    countPoints() {

        let result = new Set<Field>()
        let fields = this.board.getFields()


        //vertically
        for (let x = 0; x < fields.length; x++) {

            let countedColor = fields[x][0].getBall() != null ? fields[x][0].getBall().color : null
            let number = 0
            for (let y = 0; y < this.board.getHeight(); y++) {
                let ball = fields[x][y].getBall()
                if (ball == null) {
                    countedColor == null
                    number = 0
                } else {
                    if (countedColor == ball.color) {
                        number++
                        if (number == Settings.requiredNumberOfBallsInARow) {
                            //add all previous balls of the same color
                            for (let i = 0; i < number; i++) {
                                result.add(fields[x][y - i])
                            }
                        } else if (number > Settings.requiredNumberOfBallsInARow) {
                            // add only the new ball
                            result.add(fields[x][y])
                        }
                    } else { //color != ball.color
                        countedColor = ball.color
                        number = 1
                    }
                }
            }
        }

        //horizontally
        for (let x = 0; x < fields.length; x++) {

            let countedColor = fields[x][0].getBall() != null ? fields[x][0].getBall().color : null
            let number = 0
            for (let y = 0; y < this.board.getHeight(); y++) {
                let ball = fields[x][y].getBall()
                if (ball == null) {
                    countedColor == null
                    number = 0
                } else {
                    if (countedColor == ball.color) {
                        number++
                        if (number == Settings.requiredNumberOfBallsInARow) {
                            //add all previous balls of the same color
                            for (let i = 0; i < number; i++) {
                                result.add(fields[x][y - i])
                            }
                        } else if (number > Settings.requiredNumberOfBallsInARow) {
                            // add only the new ball
                            result.add(fields[x][y])
                        }
                    } else { //color != ball.color
                        countedColor = ball.color
                        number = 1
                    }
                }
            }
        }
        for (let y = 0; y < fields.length; y++) {
            let countedColor = fields[0][y].getBall() != null ? fields[0][y].getBall().color : null
            let number = 0
            for (let x = 0; x < this.board.getWidth(); x++) {
                let ball = fields[x][y].getBall()
                if (ball == null) {
                    countedColor == null
                    number = 0
                } else {
                    if (countedColor == ball.color) {
                        number++
                        if (number == Settings.requiredNumberOfBallsInARow) {
                            //add all previous balls of the same color
                            for (let i = 0; i < number; i++) {
                                result.add(fields[x - i][y])
                            }
                        } else if (number > Settings.requiredNumberOfBallsInARow) {
                            // add only the new ball
                            result.add(fields[x][y])
                        }
                    } else { //color != ball.color
                        countedColor = ball.color
                        number = 1
                    }
                }
            }
        }

        //diagonally - left-top to right-bottom
        /*
        Linear function y = -x + b is modified by changed b and x parameter
        it starts at the bottom-left corner (x = 0, b = -board.getHeight())
        and b is iterated up to +board.getHeight(). diagonal is checked for
        every x beloning to board
        */
        for (let b = -(this.board.getHeight() - Settings.requiredNumberOfBallsInARow);
            b < this.board.getHeight() - Settings.requiredNumberOfBallsInARow; b++) {

            let countedColor = null
            if (fields[b <= 0 ? 0 : b][b <= 0 ? this.board.getHeight() + b - 1 : this.board.getHeight() - 1].getBall() != null)
                countedColor = fields[b <= 0 ? 0 : b][b <= 0 ? this.board.getHeight() + b - 1 : this.board.getHeight() - 1].getBall().color
            let number = 0
            for (let x = b <= 0 ? 0 : b; x < this.board.getWidth(); x++) {
                if (-x + b > 0 && -x + b < this.board.getHeight()) {
                    let ball = fields[x][-x + b].getBall()
                    if (ball == null) {
                        countedColor == null
                        number = 0
                    } else {
                        if (countedColor == ball.color) {
                            number++
                            if (number == Settings.requiredNumberOfBallsInARow) {
                                //add all previous balls of the same color
                                for (let i = 0; i < number; i++) {
                                    result.add(fields[x - i][-x + b + i]) //-(x-i) + b
                                }
                            } else if (number > Settings.requiredNumberOfBallsInARow) {
                                // add only the new ball
                                result.add(fields[x][-x + b])
                            }
                        } else { //color != ball.color
                            countedColor = ball.color
                            number = 1
                        }
                    }
                }
            }
        }

        //diagonally - top-right corner to bottom-left
        for (let b = -(this.board.getHeight() - Settings.requiredNumberOfBallsInARow);
            b < this.board.getHeight() - Settings.requiredNumberOfBallsInARow; b++) {

            let countedColor = null
            if (fields[b <= 0 ? 0 : b][b <= 0 ? this.board.getHeight() - 1 : this.board.getHeight() - b - 1].getBall() != null)
                countedColor = fields[b <= 0 ? 0 : b][b <= 0 ? this.board.getHeight() - 1 : this.board.getHeight() - b - 1].getBall()?.color
            let number = 0
            for (let x = b < 0 ? -b : 0; x < this.board.getWidth(); x++) {
                if (x + b > 0 && x + b < this.board.getHeight()) {
                    let ball = fields[x][x + b].getBall()
                    if (ball == null) {
                        countedColor == null
                        number = 0
                    } else {
                        if (countedColor == ball.color) {
                            number++
                            if (number == Settings.requiredNumberOfBallsInARow) {
                                //add all previous balls of the same color
                                for (let i = 0; i < number; i++) {
                                    result.add(fields[x - i][x + b - i]) //(x-i) + b
                                }
                            } else if (number > Settings.requiredNumberOfBallsInARow) {
                                // add only the new ball
                                result.add(fields[x][x + b])
                            }
                        } else { //color != ball.color
                            countedColor = ball.color
                            number = 1
                        }
                    }
                }
            }
        }

        console.log("found matches: ", result);

        return [...result]
    }

}