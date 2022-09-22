import Field from "./Field.js"
import Path from "./Path.js"

export default class Pathfinder {
    private paths: Path[] = []
    private shortestPathsTo: Path[][] = []
    private start: Field
    private finish: Field

    constructor(w: number, h: number) {

    }

    findPath = (start: Field, finish: Field) => {
        this.start = start
        this.finish = finish

        if (start.getX() > 0) {

        }
    }
}