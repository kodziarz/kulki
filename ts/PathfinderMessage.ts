import Board from "./Board";
import Field from "./Field";
import Walker from "./Walker";

/**
 * Contains types of {@link PathfinderMessage}.
 */
export enum PathfinderMessageTypes {
    /**
     * {@link Pathfinder~Pathfinder} sends a request to {@link Walker~Walker} to start pathfinding.
     * {@link PathfinderMessage~PathfinderMessage} with this type requires
     * {@link PathfinderMessage~PathfinderMessage.start} and {@link PathfinderMessage~PathfinderMessage.finish}
     */
    PATHFIND,
    /**
     * {@link Walker~Walker} emits an event, that he met a new {@link Field~Field}.
     * {@link Pathfinder~Pathfinder} decides then, whether to maintain him or not.
     */
    FIELD_REACHED,
    /**
     * {@link Pathfinder~Pathfinder} sends request to {@link Walker~Walker} to continue pathfinding.
     * Used after {@link Pathfinder~Pathfinder} gets {@link FIELD_REACHED} message and is interpreted by 
     * {@link Walker~Walker} as a permission to "split" (send {@link COWORKER_NEEDED} messages), if needed.
     */
    CONTINUE_PATHFINDING,
    /**
     * {@link Walker~Walker} emits an event, that he needs to "split", to go in few directions.
     * {@link Pathfinder~Pathfinder} receives then the new {@link Walker~Walker} object with a new
     * {@link Field~Field} added to {@link Path~Path}
     */
    COWORKER_NEEDED,
    /**
     * {@link Pathfinder~Pathfinder} sens a request to {@link Walker~Walker} to continue pathfinding with some initial data.
     * Used when {@link Pathfinder~Pathfinder} receives {@link COWORKER_NEEDED} message.
     */
    CONTINUE_PATHFINDING_BY_DATA
}

/**
 * Structure used for communication between {@link Pathfinder~Pathfinder} and {@link worker | Workers}
 */
export interface PathfinderMessage {
    /**
     * Type from {@link PathfinderMessageTypes}.
     */
    type: number,
    board: Board,
    walker?: Walker,
    start?: Field,
    finish?: Field
}