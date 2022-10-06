export default class Walker extends EventTarget {
    constructor() {
        super();
        this.findPath = (start, finish) => {
            this.worker.postMessage({
                message: Walker.MESSAGES.PATHFIND,
                start: start,
                finish: finish
            });
        };
        this.worker = new Worker("js/worker.js", { type: "module" });
    }
}
Walker.MESSAGES = {
    PATHFIND: 0
};
