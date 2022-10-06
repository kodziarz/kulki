import Field from "./Field.js";
import Walker from "./Walker.js";
// import scripts
let walker = new Walker(self);
onmessage = (e) => {
    console.log(e.data);
    console.log("self: ", self);
    if (e.message == undefined)
        return null;
    switch (e.message) {
        case Walker.MESSAGES.PATHFIND:
            if (!(e.start instanceof Field && e.start instanceof Field))
                return null;
            //walker.findPath()
            break;
    }
};
