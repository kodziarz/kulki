import Field from "./Field.js";
import Path from "./Path.js";
import Walker from "./Walker.js";
import FieldReachedEvent from "./walkerEvents/FieldReachedEvent.js";

export default class Test extends EventTarget {

    constructor() {
        super()
        console.log("działa ogółem");
        let event: CustomEvent = new CustomEvent("onWait", { detail: "elo" })

        setTimeout(() => {
            console.log("zadziałało");

            this.dispatchEvent(new FieldReachedEvent(new Field(0, 2), new Path()))
        }, 1000)

        //let walker = new Walker()
        //walker.findPath(new Field(0, 2), new Field(2, 0))
    }
}