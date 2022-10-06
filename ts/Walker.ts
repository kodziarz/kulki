import Field from "./Field.js";
import Path from "./Path.js";

export default class Walker extends EventTarget {

    static MESSAGES = {
        PATHFIND: 0
    }

    private path: Path
    private worker: Worker

    constructor() {
        super()
        this.worker = new Worker("js/worker.js", { type: "module" })
    }

    findPath = (start: Field, finish: Field) => {
        this.worker.postMessage({
            message: Walker.MESSAGES.PATHFIND,
            start: start,
            finish: finish
        })
    }
}