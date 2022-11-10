export default class MyWorker extends Worker {

    id: number
    constructor(url: string, id: number) {
        super(url)
        this.id = id
    }
}