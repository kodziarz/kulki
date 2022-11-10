import Field from "./Field";
import { NotNull, ValidateNotNull } from "./Validators";

/**
 * Provides access to list of {@link Field~Field | Fields} in currently reaserched path to target.
 * Main aim is to manage permissions to data and actions performed on the object.
 * Used by {@link Walker~Walker} and {@link Pathfinder~Pathfinder}.
 */
export default class Path {
    private fields: Field[] = []

    constructor() {

    }

    addField = (field: Field) => {
        this.fields.push(field)
    }

    getLastField = () => {
        return this.fields[this.fields.length - 1]
    }

    getLength = () => {
        return this.fields.length
    }

    forEachField(callback: (field: Field, i?: number) => void): void {
        this.fields.forEach((field: Field, i) => {
            callback(field, i)
        })
    }

    /**
     * Generates {@link Path~Path} instance from JSON data.
     * @param o JSON object which is going to be parsed.
     * @returns {@link Path~Path} object parsed from JSON data.
     */
    @ValidateNotNull
    static fromJSON(@NotNull o: Object): Path {
        let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {
            if (key == "fields") {
                return [key, value.map((field: Field) => {
                    return Field.fromJSON(field)
                })]
            }
            return [key, value]
        }))
        return Object.assign(new Path(), result)
    }
}