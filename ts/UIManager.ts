import Ball, { COLORS } from "./Ball";
import Board from "./Board";
import Field from "./Field";
import Path from "./Path";
import SETTINGS from "./settings.json";

/**
 * @module
 * Manages displaying data on the screen.
 */
export default class UIManager {

    static CONSTS = {
        FIELD_DIV_SIZE: 50,
        BALL: {
            NORMAL_SIZE: 30,
            MAGNIFIED_SIZE: 40
        }
    }

    root: HTMLDivElement
    previewsSectionDiv: HTMLDivElement
    previewBallDivs: HTMLDivElement[] = []
    pointCounterDiv: HTMLDivElement
    boardDiv: HTMLDivElement

    board: Board
    divs: HTMLDivElement[][]
    nextBalls: Ball[]

    selectedField: Field
    selectedDiv: HTMLDivElement

    onPathfindRequest = async (start: Field, finish: Field): Promise<Path> => { return undefined }

    onNewStartFieldSelected = (start: Field): void => { return undefined }

    onMoveRequest = (start: Field, finish: Field): void => { return undefined }


    constructor(root: HTMLDivElement) {
        this.root = root
        this.root.style.position = "relative"

        this.previewsSectionDiv = this.createPreviewSectionDiv()
        this.root.appendChild(this.previewsSectionDiv)

        this.root.appendChild(this.createPointsCounterDiv())
        this.pointCounterDiv.innerText = "0"

        this.boardDiv = document.createElement("div")
        this.root.appendChild(this.boardDiv)
        this.boardDiv.style.position = "relative"
    }

    /**
     * Sets the {@link Board~Board} which is going to be displayed anytime the
     * {@link displayGameboard:function} method will be invoked.
     * @param board {@link Board~Board} object.
     */
    setGameboard = (board: Board) => {
        this.board = board
        this.divs = [...new Array(board.getWidth())].map((e, x) => { return [...new Array(board.getHeight())].map((e, y) => { return null }) })

        this.displayGameboard()
    }

    setNextBalls(balls: Ball[]) {

        this.nextBalls = balls
        balls.forEach((ball, index) => {
            let div = this.previewBallDivs[index].children[0] as HTMLDivElement
            div.style.display = "block"
            switch (ball.color) {
                case COLORS.BLACK:
                    div.style.display = "block"
                    div.style.backgroundColor = "black"
                    break
                case COLORS.BLUE:
                    div.style.display = "block"
                    div.style.backgroundColor = "blue"
                    break
                case COLORS.GREEN:
                    div.style.display = "block"
                    div.style.backgroundColor = "green"
                    break
                case COLORS.GREY:
                    div.style.display = "block"
                    div.style.backgroundColor = "gray"
                    break
                case COLORS.RED:
                    div.style.display = "block"
                    div.style.backgroundColor = "red"
                    break
                case COLORS.WHITE:
                    div.style.display = "block"
                    div.style.backgroundColor = "white"
                    break
                case COLORS.YELLOW:
                    div.style.display = "block"
                    div.style.backgroundColor = "yellow"
                    break
            }
        })

    }

    /**
     * Displays gameboard basing on {@link board:member} field, which can be set by
     * {@link setGameboard:function} method.
     */
    displayGameboard = () => {

        this.board.getFields().forEach((column, x) => {
            column.forEach((field, y) => {
                let div = this.createFieldDiv()
                this.boardDiv.appendChild(div)
                this.divs[x][y] = div

                div.style.left = (x * UIManager.CONSTS.FIELD_DIV_SIZE) + "px"
                div.style.top = (y * UIManager.CONSTS.FIELD_DIV_SIZE) + "px"

                this.setFieldOnClicks(div, field)
            })
        })
    }

    createFieldDiv() {
        let div = document.createElement("div")

        div.style.position = "absolute"
        div.style.width = UIManager.CONSTS.FIELD_DIV_SIZE + "px"
        div.style.height = UIManager.CONSTS.FIELD_DIV_SIZE + "px"
        div.style.border = "1px solid black"
        //div.style.padding = "auto"

        let ball = document.createElement("div")
        div.appendChild(ball)
        ball.style.width = UIManager.CONSTS.BALL.NORMAL_SIZE + "px"
        ball.style.height = UIManager.CONSTS.BALL.NORMAL_SIZE + "px"
        ball.style.margin = "0"
        ball.style.position = "absolute"
        ball.style.top = "50%"
        ball.style.left = "50%"
        ball.style.transform = "translate(-50%, -50%)"
        ball.style.borderRadius = "50%"
        ball.style.border = "1px solid black"
        ball.style.display = "none"

        let magnifiedBall = document.createElement("div")
        div.appendChild(magnifiedBall)
        magnifiedBall.style.width = UIManager.CONSTS.BALL.MAGNIFIED_SIZE + "px"
        magnifiedBall.style.height = UIManager.CONSTS.BALL.MAGNIFIED_SIZE + "px"
        magnifiedBall.style.margin = "0"
        magnifiedBall.style.position = "absolute"
        magnifiedBall.style.top = "50%"
        magnifiedBall.style.left = "50%"
        magnifiedBall.style.transform = "translate(-50%, -50%)"
        magnifiedBall.style.borderRadius = "50%"
        magnifiedBall.style.border = "1px solid black"
        magnifiedBall.style.display = "none"

        return div
    }

    setFieldOnClicks(div: HTMLDivElement, field: Field) {

        let path: Path = null
        div.onclick = () => {
            if (path != null && field.isLegal() && this.selectedField != null) {
                this.onMoveRequest(this.selectedField, field)
                this.selectedDiv = null
                this.selectedField = null
            }
        }

        (div.children[0] as HTMLDivElement).onclick = () => {
            this.formatDivAsSelected(div)
            if (this.selectedDiv != null) this.formatDivAsNotSelected(this.selectedDiv)
            this.selectedDiv = div
            this.selectedField = field
            this.onNewStartFieldSelected(field)
        }

        (div.children[1] as HTMLDivElement).onclick = () => {
            this.formatDivAsNotSelected(div)
            this.selectedField = null
            this.selectedDiv = null
            this.clearBoardFromPathPreview()
        }

        div.onmouseover = async (ev) => {
            if (this.selectedField != null && field.isLegal()) {
                this.clearBoardFromPathPreview();
                path = await this.onPathfindRequest(this.selectedField, field);
                path.forEachField((fieldFromPath) => {
                    this.formatDivAsPathPreview(this.divs[fieldFromPath.getX()][fieldFromPath.getY()] as HTMLDivElement)
                })
            }
        }

        div.onmouseout = () => {
            path = null
        }
    }

    createPreviewSectionDiv() {
        let previewDiv = document.createElement("div")
        previewDiv.style.height = (50 + UIManager.CONSTS.BALL.NORMAL_SIZE) + "px"

        let textDiv = document.createElement("div")
        previewDiv.appendChild(textDiv)
        textDiv.innerText = "Następne:"
        textDiv.style.display = "block"

        let ballsPreviewDiv = document.createElement("div")
        previewDiv.appendChild(ballsPreviewDiv)
        previewDiv.style.display = "block"
        previewDiv.style.position = "relative"

        for (let i = 0; i < SETTINGS.numberOfGeneratedBallsAtATime; i++) {
            let div = this.createFieldDiv()
            ballsPreviewDiv.appendChild(div)
            this.previewBallDivs.push(div)

            div.style.position = "absolute"
            div.style.left = (i * UIManager.CONSTS.FIELD_DIV_SIZE) + "px"
        }

        return previewDiv
    }

    createPointsCounterDiv() {
        let div = document.createElement("div")

        let textDiv = document.createElement("div")
        div.appendChild(textDiv)
        textDiv.innerHTML = "Punkty:&nbsp;"
        textDiv.style.display = "inline-block"

        let numberDiv = document.createElement("div")
        div.appendChild(numberDiv)
        this.pointCounterDiv = numberDiv
        numberDiv.style.display = "inline-block"

        return div
    }

    actualiseField(x: number, y: number) {
        this.formatDivByField(this.divs[x][y], this.board.getField(x, y))
        this.clearBoardFromPathPreview()
    }

    removeBalls(fields: Field[]) {
        fields.forEach((field) => {
            this.board.getField(field.getX(), field.getY()).deleteBall()
            this.actualiseField(field.getX(), field.getY())
        })
        this.pointCounterDiv.innerText = parseInt(this.pointCounterDiv.innerText) + fields.length + ""
    }

    private formatDivByField(div: HTMLDivElement, field: Field) {
        if (field.getBall() == null)
            this.formatDivAsEmpty(div)
        else {
            div.style.backgroundColor = "none"
            let ball = div.children[0] as HTMLDivElement
            let magnifiedBall = div.children[1] as HTMLDivElement
            switch (field.getBall().color) {
                case COLORS.BLACK:
                    ball.style.display = "block"
                    ball.style.backgroundColor = "black"
                    magnifiedBall.style.backgroundColor = "black"
                    break
                case COLORS.BLUE:
                    ball.style.display = "block"
                    ball.style.backgroundColor = "blue"
                    magnifiedBall.style.backgroundColor = "blue"
                    break
                case COLORS.GREEN:
                    ball.style.display = "block"
                    ball.style.backgroundColor = "green"
                    magnifiedBall.style.backgroundColor = "green"
                    break
                case COLORS.GREY:
                    ball.style.display = "block"
                    ball.style.backgroundColor = "gray"
                    magnifiedBall.style.backgroundColor = "gray"
                    break
                case COLORS.RED:
                    ball.style.display = "block"
                    ball.style.backgroundColor = "red"
                    magnifiedBall.style.backgroundColor = "red"
                    break
                case COLORS.WHITE:
                    ball.style.display = "block"
                    ball.style.backgroundColor = "white"
                    magnifiedBall.style.backgroundColor = "white"
                    break
                case COLORS.YELLOW:
                    ball.style.display = "block"
                    ball.style.backgroundColor = "yellow"
                    magnifiedBall.style.backgroundColor = "yellow"
                    break
            }
        }
    }

    formatDivAsEmpty(div: HTMLDivElement) {
        div.style.backgroundColor = "none";
        (div.children[0] as HTMLDivElement).style.display = "none";
        (div.children[1] as HTMLDivElement).style.display = "none";
    }

    formatDivAsSelected(div: HTMLDivElement) {
        (div.children[0] as HTMLDivElement).style.display = "none";
        (div.children[1] as HTMLDivElement).style.display = "block";
    }

    formatDivAsNotSelected(div: HTMLDivElement) {
        (div.children[0] as HTMLDivElement).style.display = "block";
        (div.children[1] as HTMLDivElement).style.display = "none";
    }

    formatDivAsPathPreview(div: HTMLDivElement) {
        div.style.backgroundColor = "red"
    }

    clearBoardFromPathPreview() {
        this.divs.forEach((column, x) => {
            column.forEach((div, y) => {
                div.style.backgroundColor = "white"
            })
        })
    }

    formatDivAsTravelledPath(div: HTMLDivElement) {
        div.style.backgroundColor = "pink"
    }

}