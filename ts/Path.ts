import Field from "./Field";

export default class Path {
    private fields: Field[] = []

    constructor() {

    }

    addField = (field: Field) => {
        this.fields.push(field)
    }
}