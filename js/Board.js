import Field from "./Field.js";
export default class Board {
    constructor(w, h) {
        this.fields = [];
        for (let x = 0; x < w; x++) {
            this.fields[x] = [];
            for (let y = 0; y < h; y++) {
                this.fields[x][y] = new Field(x, y);
            }
        }
    }
}
