import Ball, { COLORS } from "./Ball";
import Board from "./Board";
import Field from "./Field";
import GameManager from "./GameManager";
import Pathfinder from "./Pathfinder";
import UIManager from "./UIManager";
import SETTINGS from "./settings.json";

export default class Main {

    root: HTMLDivElement
    uiDiv: HTMLDivElement
    board: Board
    uiManager: UIManager
    gameManager: GameManager
    pathfinder: Pathfinder

    nextBalls: Ball[]

    constructor() {
        this.root = document.getElementById("main") as HTMLDivElement
        this.uiDiv = document.createElement("div")
        this.root.appendChild(this.uiDiv)

        this.board = new Board(9, 9)

        this.uiManager = new UIManager(this.uiDiv)
        this.uiManager.setGameboard(this.board)

        this.gameManager = new GameManager(this.board)

        this.pathfinder = new Pathfinder(this.board)

        this.startGame()

        this.uiManager.onNewStartFieldSelected = (start: Field) => {
            this.pathfinder = new Pathfinder(this.board)
            this.pathfinder.findPath(start, this.board.getField(this.board.getWidth() - 1, this.board.getHeight() - 1))
        }
        this.uiManager.onPathfindRequest = async (start, finish) => { return await this.pathfinder.findPath(start, finish) }
        //console.log("board: ", this.board);
        this.uiManager.onMoveRequest = (start, finish) => {
            this.board.moveBall(start, finish);
            this.uiManager.actualiseField(start.getX(), start.getY())
            this.uiManager.actualiseField(finish.getX(), finish.getY())
            this.pathfinder = new Pathfinder(this.board)
            let dells = this.gameManager.countPoints()
            if (dells.length == 0)
                this.putBallsOnBoard()
            else this.uiManager.removeBalls(dells)
        }

    }

    private async startGame() {
        // wymuszenie, by pathfinder potworzył dużo workerów i "rozruszał" przeglądarkę
        // await this.pathfinder.findPath(this.board.getField(0, 0), this.board.getField(this.board.getWidth() - 1, this.board.getHeight() - 1))
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