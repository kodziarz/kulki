export default class Walker extends EventTarget {
    constructor(root) {
        super();
        this.findPath = (start, finish) => {
            this.worker.postMessage({
                message: Walker.MESSAGES.PATHFIND,
                start: start,
                finish: finish
            });
        };
        this.worker = root;
    }
}
Walker.MESSAGES = {
    PATHFIND: 0
};
