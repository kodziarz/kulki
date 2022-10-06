import Field from "../Field";
import Path from "../Path";

export default class FieldReachedEvent<T> extends CustomEvent<T> {
    field: Field
    currentPath: Path
    constructor(field: Field, currentPath: Path) {
        super("onFieldReachedEvent", null as CustomEventInit)
        this.field = field
        this.currentPath = currentPath
    }
}