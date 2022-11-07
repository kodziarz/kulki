import Field from "./Field"
import { NotNull, ValidateNotNull } from "./Validators"

export default class Board {
    private fields: Field[][] = []

    constructor(w: number, h: number) {
        this.fields = [...new Array(w)].map((e, x) => { return [...new Array(h)].map((e, y) => { return new Field(x, y) }) })
    }

    /**
     * Checks if such a {@link Field~Field} exists on the {@link Board~Board}
     * @param x X coordinate of {@link Field~Field}.
     * @param y Y coordinate of {@link Field~Field}.
     * @returns True if a {@link Field~Field} with such coordinates exists.
     */
    doesFieldExist = (x: number, y: number) => {
        return !(this.fields[x] == null || this.fields[x] == undefined || this.fields[x][y] == null || this.fields[x][y] == undefined)
    }

    getHeight = () => {
        return this.fields[0].length
    }

    getWidth = () => {
        return this.fields.length
    }

    /**
     * Returns a {@link Field~Field} by specific coordinates.
     * @param x X coordinate of {@link Field~Field}.
     * @param y Y coordinate of {@link Field~Field}.
     * @returns {@link Field~Field} if it exists, otherwise null.
     */
    getField = (x: number, y: number): Field => {
        if (!this.doesFieldExist(x, y))
            return null
        return this.fields[x][y]
    }

    /**
     * Returns a list of {@link Field~Field | Fields} which {@link Board~Board} contains.
     * @returns Copy of two-dimensional array of {@link Field~Field | Fields}.
     */
    getFields = (): Field[][] => {
        return this.fields
    }

    /**
     * Generates {@link Board~Board} instance from JSON data.
     * @param o JSON object which is going to be parsed.
     * @returns {@link Board~Board} object parsed from JSON data.
     */
    @ValidateNotNull
    static fromJSON(@NotNull o: Object): Board {
        if (o == null || o == undefined)
            throw new Error("Board cannot be parsed from null.")
        let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {
            if (key == "fields") {
                return [key, [...value].map((column: Field[]) => { return [...column].map((field: Field) => { return Object.assign(new Field(0, 0), field) }) })]
            } else if (key == "finish") {
                return [key, Field.fromJSON(value)]
            }
            return [key, value]
        }))
        return Object.assign(new Board(0, 0), result)
    }
}