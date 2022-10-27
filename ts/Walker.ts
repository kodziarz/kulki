import Field from "./Field";
import Path from "./Path";
import FieldReachedEvent from "./walkerEvents/FieldReachedEvent";

export default class Walker extends EventTarget {

    static MESSAGES = {
        PATHFIND: 0
    }

    private path: Path
    private worker: Worker

    constructor(root: Worker) {
        super()
        this.worker = root
    }

    findPath = (start: Field, finish: Field) => {
        this.path.addField(start)
        this.dispatchEvent(new FieldReachedEvent(start, this.path))
        // this.worker.postMessage({
        //     message: Walker.MESSAGES.PATHFIND,
        //     start: start,
        //     finish: finish
        // })
    }
}