import Board from "./Board"
import Field from "./Field"
import Path from "./Path"
import { PathfinderMessage, PathfinderMessageTypes } from "./PathfinderMessage"
import Walker from "./Walker"

/**
 * Finds shortest path with method {@link findPath}.
 */
export default class Pathfinder {
    /**Path to the {@link worker} script, which implements multitreading in the project. */
    static WORKER_FILE = "./dist/worker.js"

    /**@public Gameboard on which the shortest {@link Path~Path} is found. */
    private gameBoard: Board
    /**@public List of workers currently working on finding shortest {@link Path~Path}. */
    private workers: Worker[] = []
    /**@public Map of currently shortest {@link Path~Path | Paths} to each {@link Field~Field} of given {@link Board~Board}. */
    private shortestPathsTo: (Path)[][] = []
    /**@public length of currently shortest {@link Path~Path} to {@link finish:member} */
    private shortestFinishedPathLength: number = null
    /**@public Beginning {@link Field~Field} of researched {@link Path~Path}. */
    private start: Field
    /**@public {@link Field~Field} where the {@link Path~Path} should lead to (target). */
    private finish: Field
    /**
     * @public A resolve function which is given by promise returned by {@link findPath:function} method
     * and resolved after cooperation with {@link worker | workers}.
     * */
    private resolve: Function

    /**
     * @param board Gameboard on which the shortest path is found.
     */
    constructor(board: Board) {
        this.gameBoard = board
        this.shortestPathsTo = [... new Array(board.getWidth())].map(() => { return (new Array(board.getHeight())).fill(null) })
        console.log("shortestPathsTo: ", this.shortestPathsTo);

    }

    /**
     * Finds the shortest {@link Path~Path} to finish {@link Field~Field}.
     * @param start Beginning {@link Field~Field} of researched {@link Path~Path}.
     * @param finish {@link Field~Field} where the {@link Path~Path} should lead to (target).
     * @returns Promise with a {@link Path~Path}.
     */
    findPath = async (start: Field, finish: Field): Promise<Path> => {
        return new Promise((resolve, reject) => {
            this.start = start
            this.finish = finish
            this.resolve = resolve

            if (this.gameBoard.doesFieldExist(start.getX(), start.getY())
                && this.gameBoard.doesFieldExist(finish.getX(), finish.getY())) {
                this.createNewWorker({
                    type: PathfinderMessageTypes.PATHFIND,
                    board: this.gameBoard,
                    start: start,
                    finish: finish
                } as PathfinderMessage)
            } else {
                reject(new Error("ChybaCiePowaliloException"))
            }
        })
    }

    /**
     * @public
     * Creates new {@link worker} (new thread) and sets event handlers for him.
     * @param message {@link PathfinderMessage~PathfinderMessage} which is going to be posted to {@link worker} just after creation of it.
     */
    private createNewWorker = (message: PathfinderMessage) => {

        let worker = new Worker(Pathfinder.WORKER_FILE)

        // whenever the worker reports reaching new Field it is checked, if there wasn't already a shorter path to it found.
        worker.addEventListener("message", (e) => {
            let m: PathfinderMessage = e.data

            switch (m.type) {
                case PathfinderMessageTypes.FIELD_REACHED:

                    m.walker = Walker.fromJSON(m.walker)
                    // console.log("FIELD_REACHED");
                    // console.log("message: ", m);
                    // debugger


                    if (this.canWorkerBeFastest(m.walker)) {
                        // found is better than current
                        let lastField = m.walker.getPath().getLastField()
                        this.shortestPathsTo[lastField.getX()][lastField.getY()] = m.walker.getPath()

                        if (this.walkerDidReachedFinish(m.walker)) {
                            this.removeWorker(worker)
                            this.shortestFinishedPathLength = m.walker.getPath().getLength()
                        } else worker.postMessage({ type: PathfinderMessageTypes.CONTINUE_PATHFINDING })
                    } else {
                        // found is already worse than current
                        this.removeWorker(worker)
                        // console.log("The worker was redundant. Current workers table length: ", this.workers.length);
                    }

                    // console.log("shortestPathsTo: ");
                    // console.table(this.shortestPathsTo)
                    // debugger
                    break
                case PathfinderMessageTypes.COWORKER_NEEDED:
                    m.walker = Walker.fromJSON(m.walker)

                    if (this.canWorkerBeFastest(m.walker)) {

                        let lastField = m.walker.getPath().getLastField()
                        this.shortestPathsTo[lastField.getX()][lastField.getY()] = m.walker.getPath()

                        if (this.walkerDidReachedFinish(m.walker)) {
                            this.shortestFinishedPathLength = m.walker.getPath().getLength()
                            console.log("Reached the end with path: ", m.walker.getPath());
                        } else {
                            this.createNewWorker({
                                type: PathfinderMessageTypes.CONTINUE_PATHFINDING_BY_DATA,
                                walker: m.walker
                            } as PathfinderMessage)
                        }
                    }
                    // console.log("shortestPathsTo: ");
                    // console.table(this.shortestPathsTo)
                    // debugger
                    break
                default:
                    console.log("message: ", m);
                    console.error("Unkown type of Pathfinder message.");
            }
        })

        worker.postMessage(JSON.parse(JSON.stringify(message)))
        this.workers.push(worker)
    }

    /**
     * @public Checks if the {@link Path~Path} of the given {@link Walker~Walker} is short enough that it is
     * worth maintaining him.
     * @param walker {@link Walker~Walker} whoose {@link Path~Path} is verified.
     * @retuns True if the length of the {@link Walker~Walker | Walker's} {@link Path~Path} is shorter than
     * currently shortest {@link Path~Path} to the {@link Field~Field} it leads to.
     */
    private canWorkerBeFastest = (walker: Walker) => {
        let checkedPath: Path = walker.getPath()

        if (this.shortestFinishedPathLength != null && checkedPath.getLength() < this.shortestFinishedPathLength)
            return false
        let field: Field = checkedPath.getLastField()
        let currentPath = this.shortestPathsTo[field.getX()][field.getY()]
        return currentPath == null || currentPath.getLength() > checkedPath.getLength()
    }

    /**
     * Checks if specified {@link Walker~Walker} reached the {@link finish:member} {@link Field~Field}.
     * @public
     * @param walker {@link Walker~Walker} object from {@link worker}.
     * @returns True, if {@link Walker~Walker} reached the {@link finish:member} {@link Field~Field}, otherwise false.
     */
    private walkerDidReachedFinish = (walker: Walker) => {
        return walker.getPath().getLastField().getX() == this.finish.getX()
            && walker.getPath().getLastField().getY() == this.finish.getY()
    }

    /**
     * Removes {@link worker} from table, terminates it and takes care of the fact, if the actual result is found.
     * @public
     * @param worker {@link worker} to remove.
     * @remarks Invokes {@link finishPathfinding:function} method, if all {@link worker | workers} finished their work.
     */
    private removeWorker = (worker: Worker) => {
        this.workers.splice(this.workers.indexOf(worker), 1)
        worker.terminate()
        if (this.workers.length == 0)
            this.finishPathfinding()
    }

    /**
     * Executes {@link resolve:member} function.
     * @public
     */
    private finishPathfinding = () => {
        this.resolve(this.shortestPathsTo[this.finish.getX()][this.finish.getY()])
    }


}