import "reflect-metadata";
import { Enumerated } from "./Validators";

export enum COLORS {
    YELLOW,
    BLUE,
    WHITE,
    BLACK,
    GREEN,
    RED,
    GREY
}

export default class Ball {

    @Enumerated(COLORS)
    readonly color: number

    // możliwość zrobienia dekoratora, że liczba należąca do enuma COLORS
    constructor(color: number) {
        this.color = color
    }
}

//export default Ball

// function color(): any {

//     let actualPropertyValue: number = null // to w sumie powoduje, że pole już nie jest readonly xd
//     // ale bez tego byśmy używali settera w setterze i by była nieskończona rekurencja

//     return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {

//         Object.defineProperty(target, propertyKey, {
//             get: function () {
//                 return actualPropertyValue
//             },
//             set: function (value: number) {
//                 if (!(value in COLORS))
//                     throw new Error("Wrong color value. Passed color value should belong to COLORS enum.")
//                 actualPropertyValue = value
//             }
//         })
//     }
// }
