import Board from "./Board";
import Field from "./Field";
import Path from "./Path";
import { NotNull, ValidateNotNull } from "./Validators";

export default class Walker {

    /**
     * Emited when Walker reaches new {@link Field~Field}. Used by {@link Pathfinder~Pathfinder} to decide, if the Walker should be maintained.
     * @event
     * @param walker {@link Walker~Walker}, who reached the {@link Field~Field}.
     */
    onFieldReached = (walker: Walker) => { }
    /**
     * Emited when {@link Walker~Walker} needs to "split" into few directions.
     * @event
     * @param walker New generated {@link Walker~Walker}
     */
    onCoworkerNeeded = (walker: Walker) => { }
    /**
     * Emited when {@link Walker~Walker} reaches the finish.
     * @event
     * @param walker {@link Walker~Walker} object which reached the finish.
     */
    onFinishReached = (walker: Walker) => { }

    /**@public Already found {@link Path~Path}. */
    private path: Path
    /**@public Target {@link Field}. */
    private finish: Field
    /**@public {@link Board~Board} where the {@link Path~Path} is going to be found. */
    private board: Board

    constructor() {
        this.path = new Path()
    }

    /**
     * Method starts work of {@link Walker~Walker} to find {@link Path~Path}.
     * @param start Start {@link Field~Field} for researched {@link Path~Path}.
     * @param finish {@link Field~Field} where the {@link Path~Path} should lead to.
     * @remarks Emits {@link onFieldReached:function} when reached new {@link Field~Field}.
     */
    findPath = (board: Board, start: Field, finish: Field) => {

        this.board = board
        this.path.addField(start)
        this.finish = finish
        this.continuePathfinding()
    }

    /**
     * Handles {@link PathfinderMessage~PathfinderMessageTypes.CONTINUE_PATHFINDING} message.
     * Sends request to create new {@link worker | workers} and takes the first possible option (there is always
     * at least one).
     * @remarks Emits {@link onCoworkerNeeded:function} and {@link onFieldReached:function} events.
     */
    continuePathfinding = () => {

        let possible = this.getPossibleDirectionsArray()

        for (let i = 1; i < possible.length; i++) {
            let coworker = this.duplicate()
            coworker.getPath().addField(possible[i])
            this.onCoworkerNeeded(coworker)
        }

        this.path.addField(possible[0])
        this.onFieldReached(this)
    }

    /**
     * Finds {@link Path~Path} starting with some initial data (method assumes that the {@link Walker~Walker}
     * does not pathfind from the beginng of a {@link Path~Path}, because received {@link Walker~Walker} has some
     * non-empty {@link Path~Path}).
     * Used when {@link Walker~Walker} meets crossroads and needs to "split".
     * @param walker Walker object containing initial data to pathfind.
     * @remarks Emits {@link onFieldReached:function} event just after recieivng data ({@link Pathfinder~Pathfinder} needs
     * to check, if his existence makes sense).
     */
    continuePathByData = (walker: Walker) => {
        this.board = walker.board
        this.path = walker.getPath()
        this.finish = walker.getFinish()

        this.continuePathfinding()
    }

    /**@getter */
    getPath = (): Path => {
        return this.path
    }

    getFinish = () => {
        return this.finish
    }

    /**
     * @public
     * @returns List of {@link Field~Field | Fields} where the {@link Walker~Walker} can go.
     * @remarks Used after receiving {@link PathfinderMessage~PathfinderMessageTypes.CONTINUE_PATHFINDING} message.
     */
    private getPossibleDirectionsArray = () => {
        let lastField = this.path.getLastField()
        // console.log("this.path.getLastField(): ", this.path.getLastField());

        let result: Field[] = []
        if (this.board.doesFieldExist(lastField.getX() - 1, lastField.getY())) {
            result.push(this.board.getField(lastField.getX() - 1, lastField.getY()))
        }
        if (this.board.doesFieldExist(lastField.getX(), lastField.getY() + 1)) {
            result.push(this.board.getField(lastField.getX(), lastField.getY() + 1))
        }
        if (this.board.doesFieldExist(lastField.getX() + 1, lastField.getY())) {
            result.push(this.board.getField(lastField.getX() + 1, lastField.getY()))
        }
        if (this.board.doesFieldExist(lastField.getX(), lastField.getY() - 1)) {
            result.push(this.board.getField(lastField.getX(), lastField.getY() - 1))
        }
        return result
    }

    /**
     * Checks, if {@link Walker~Walker} has reached the target.
     * @public
     * @deprecated Everything which could be done be the function is performed by
     * {@link Pathfinder~Pathfinder.walkerDidReachedFinish:function} inside {@link Pathfinder~Pathfinder}.
     * @returns True if {@link Walker~Walker} has reached the {@link finish:member} {@link Field~Field},
     * otherwise false.
     */
    private isThisTheEnd = () => {
        return this.path.getLastField().getX() == this.finish.getX()
            && this.path.getLastField().getY() == this.finish.getY()
    }

    // toJSON = () => {
    //     let result = Object.fromEntries(Object.entries(this).filter(([key, value]) => { return !(value instanceof Function) }))
    //     result = Object.fromEntries(Object.entries(this).map(([key, value]) => {
    //         if (value.toJSON != undefined)
    //             return [key, value.toJSON()]
    //         return [key, value]
    //     }))
    //     return result
    // }

    /**
     * Creates a copy of the {@link Walker~Walker}.
     * @returns Copied {@link Walker~Walker}.
     * @remarks This should not be performed by a spread (\{... \}) operator, because then the child objects (e.g.
     * {@link Path~Path}) would be copied by reference.
     */
    duplicate = () => {
        return Walker.fromJSON(JSON.parse(JSON.stringify(this)))
    }

    /**
     * Generates {@link Walker~Walker} instance from JSON data.
     * @param o JSON object which is going to be parsed.
     * @returns {@link Walker~Walker} object parsed from JSON data.
     */
    @ValidateNotNull
    static fromJSON(@NotNull o: Object): Walker {
        let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {
            if (key == "path") {
                return [key, Path.fromJSON(value)]
            } else if (key == "finish") {
                return [key, Field.fromJSON(value)]
            } else if (key == "board") {
                return [key, Board.fromJSON(value)]
            }
            return [key, value]
        }))
        return Object.assign(new Walker(), result)
    }
}