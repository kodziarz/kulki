import Board from "./Board";
import Field from "./Field";
import Path from "./Path";
import Pathfinder from "./Pathfinder";
import UIManager from "./UIManager";
import Walker from "./Walker";

export default class Main {

    root: HTMLDivElement
    uiDiv: HTMLDivElement
    uiManager: UIManager

    constructor() {
        this.root = document.getElementById("main") as HTMLDivElement
        this.uiDiv = document.createElement("div")
        this.root.appendChild(this.uiDiv)

        let board = new Board(9, 9)


        this.uiManager = new UIManager(this.uiDiv)
        this.uiManager.setGameboard(board)
    }

    private test = async () => {


        let board = new Board(9, 9)
        //console.log("board: ", board);

        let pathfinder = new Pathfinder(board)
        let path = pathfinder.findPath(new Field(0, 0), new Field(8, 8))
        console.log("path: ", path);
        console.log("path: ", await path);
    }
}

window.onload = () => {
    let main = new Main()
}