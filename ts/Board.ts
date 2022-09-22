import Field from "./Field.js"

export default class Board {
    private fields: Field[][] = []

    constructor(w: number, h: number) {
        for (let x = 0; x < w; x++) {
            this.fields[x] = []
            for (let y = 0; y < h; y++) {
                this.fields[x][y] = new Field(x, y)
            }
        }
    }
}