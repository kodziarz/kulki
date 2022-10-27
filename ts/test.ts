import Field from "./Field";
import Path from "./Path";
import Walker from "./Walker";
import FieldReachedEvent from "./walkerEvents/FieldReachedEvent";

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

window.onload = () => {
    let test = new Test()
    test.addEventListener("onFieldReachedEvent", (e) => {
        console.log("e.details: ", e);
    })
}