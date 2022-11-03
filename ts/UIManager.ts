import Board from "./Board";

/**
 * @module
 * Manages displaying data on the screen.
 */
export default class UIManager {

    static CONSTS = {
        DIV_SIZE: 50
    }

    root: HTMLDivElement
    gameboard: Board
    divs: HTMLDivElement[][]

    constructor(root: HTMLDivElement) {
        this.root = root
        this.root.style.position = "relative"
    }

    /**
     * Sets the {@link Board~Board} which is going to be displayed anytime the
     * {@link displayGameboard:function} method will be invoked.
     * @param board {@link Board~Board} object.
     */
    setGameboard = (board: Board) => {
        this.gameboard = board
        this.divs = [...new Array(board.getWidth())].map((e, x) => { return [...new Array(board.getHeight())].map((e, y) => { return null }) })

        this.displayGameboard()
    }

    /**
     * Displays gameboard basing on {@link gameboard:member} field, which can be set by
     * {@link setGameboard:function} method.
     */
    displayGameboard = () => {

        this.gameboard.getFields().forEach((column, x) => {
            column.forEach((field, y) => {
                let div = document.createElement("div")
                this.root.appendChild(div)
                this.divs[x][y] = div

                div.style.position = "absolute"
                div.style.width = UIManager.CONSTS.DIV_SIZE + "px"
                div.style.height = UIManager.CONSTS.DIV_SIZE + "px"
                div.style.left = (x * UIManager.CONSTS.DIV_SIZE) + "px"
                div.style.top = (y * UIManager.CONSTS.DIV_SIZE) + "px"
                div.style.border = "1px solid black"
            })
        })
    }

}