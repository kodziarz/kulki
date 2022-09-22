export default class Field {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    isLegal() {
        return this._isLegal;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
}
