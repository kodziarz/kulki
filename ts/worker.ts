import Field from "./Field";
import Path from "./Path";
import Walker from "./Walker";
// import scripts

let walker = new Walker(this)

onmessage = (e: any) => {
    console.log(e.data);
    console.log("self: ", self);

    if (e.message == undefined) return null

    switch (e.message) {
        case Walker.MESSAGES.PATHFIND:
            if (!(e.start instanceof Field && e.start instanceof Field)) return null
            //walker.findPath()

            break
    }

}