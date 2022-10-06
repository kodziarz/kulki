import Field from "./Field.js";
import Path from "./Path.js";
import Walker from "./Walker.js";
// import scripts

let path = new Path()

onmessage = (e: any) => {
    console.log(e.data);
    console.log("self: ", self);

    if (e.message == undefined) return null

    switch (e.message) {
        case Walker.MESSAGES.PATHFIND:
            if (!(e.start instanceof Field && e.start instanceof Field)) return null

            break
    }

}