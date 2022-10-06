import Walker from "../Walker";

export default class NewWalkerGeneratedEvent<T> extends CustomEvent<T> {
    walker: Walker
    constructor(walker: Walker) {
        super("onNewWalkerGeneratedEvent", null as CustomEventInit)
        this.walker = walker
    }
}