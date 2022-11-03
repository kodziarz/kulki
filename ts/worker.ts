/**
 * Script, which is invoked by {@link Pathfinder~Pathfinder} on a new thread, to calculate possible routes.
 * The script itself, creates a new {@link Walker~Walker} and provides communication between
 * {@link Pathfinder~Pathfinder}(who is on the main thread) and {@link Walker~Walker}(who is on the worker's thread)
 *  by passing {@link PathfinderMessage~PathfinderMessage}.
 * @packageDocumentation
 */
import Board from "./Board";
import Field from "./Field";
import { PathfinderMessageTypes, PathfinderMessage } from "./PathfinderMessage";
import Walker from "./Walker";

let walker = new Walker()

// listeners on Walker (child)
walker.onFieldReached = (walker: Walker) => {

    self.postMessage(JSON.parse(JSON.stringify({
        type: PathfinderMessageTypes.FIELD_REACHED,
        walker: walker
    })) as PathfinderMessage)
}
walker.onCoworkerNeeded = (walker: Walker) => {
    self.postMessage(JSON.parse(JSON.stringify({
        type: PathfinderMessageTypes.COWORKER_NEEDED,
        walker: walker
    })) as PathfinderMessage)
}

// listeners on self (on events emited by {@link Pathfinder~Pathfinder} who is de facto parent)
onmessage = (message: any) => {
    let m: PathfinderMessage = message.data
    // console.log("received message from Pathfinder: ", m);
    //console.log("self: ", self);

    switch (m.type) {
        case PathfinderMessageTypes.PATHFIND:
            console.log(m.board);
            walker.findPath(Board.fromJSON(m.board), Field.fromJSON(m.start), Field.fromJSON(m.finish))
            break
        case PathfinderMessageTypes.CONTINUE_PATHFINDING:
            walker.continuePathfinding()
            break
        case PathfinderMessageTypes.CONTINUE_PATHFINDING_BY_DATA:
            walker.continuePathByData(Walker.fromJSON(m.walker))
            break
        default:
            console.log("message: ", m);
            console.error("Unkown type of Pathfinder message.");

    }

}