export default class NewWalkerGeneratedEvent extends CustomEvent {
    constructor(walker) {
        super("onNewWalkerGeneratedEvent", null);
        this.walker = walker;
    }
}
