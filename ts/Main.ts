import Ball, { COLORS } from "./Ball";
import Board from "./Board";
import Field from "./Field";
import GameManager from "./GameManager";
import Path from "./Path";
import Pathfinder from "./Pathfinder";
import UIManager from "./UIManager";
import Walker from "./Walker";
import SETTINGS from "./settings.json";

export default class Main {

    root: HTMLDivElement
    uiDiv: HTMLDivElement
    board: Board
    uiManager: UIManager
    gameManager: GameManager

    nextBalls: Ball[]

    constructor() {
        this.root = document.getElementById("main") as HTMLDivElement
        this.uiDiv = document.createElement("div")
        this.root.appendChild(this.uiDiv)

        this.board = new Board(9, 9)

        this.uiManager = new UIManager(this.uiDiv)
        this.uiManager.setGameboard(this.board)

        this.gameManager = new GameManager(this.board)

        this.startGame()
        console.log("board: ", this.board);

    }

    private startGame() {
        this.nextBalls = this.gameManager.generateRandomBalls(SETTINGS.numberOfGeneratedBallsAtATime)

        this.putBallsOnBoard()
    }

    private putBallsOnBoard() {
        let coords = this.gameManager.pickRandomEmptyFields(SETTINGS.numberOfGeneratedBallsAtATime)

        coords.forEach(({ x, y }, index) => {
            this.board.getFields()[x][y].setBall(this.nextBalls[index])
            this.uiManager.actualiseField(x, y)
        })

        this.nextBalls = this.gameManager.generateRandomBalls(SETTINGS.numberOfGeneratedBallsAtATime)
        this.uiManager.setNextBalls(this.nextBalls)
    }
}

window.onload = () => {
    let main = new Main()
}