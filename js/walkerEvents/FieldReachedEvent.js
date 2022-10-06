export default class FieldReachedEvent extends CustomEvent {
    constructor(field, currentPath) {
        super("onFieldReachedEvent", null);
        this.field = field;
        this.currentPath = currentPath;
    }
}
