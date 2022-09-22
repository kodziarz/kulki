// onmessage = (e) => {
//     console.log(e.data);
//     let y: number = 0
//     for (let i: number = 0; i < 1000000; i++) {
//         y = Math.sqrt(i)
//     }
//     //console.log("jestem: ", e.data, ", uzsyskałem: ", y);
//     self.postMessage("jestem: " + e.data + ", uzyskałem: " + y)
// 
export default class Walker {
    constructor() {
        this.worker = new Worker("js/worker.js");
    }
}
