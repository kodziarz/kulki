import { PathfinderMessageTypes } from "./PathfinderMessage";

// export const PathfinderMessage = (target: Function) => {
//     const orginal = target;

//     const newConstructor: any = function (...args: any[]) {

//         // console.log("args:", args); // Array [ 10, 10 ]

//         // this.przedmiot = "Matematyka";
//         // console.log("undefined:", this.a);  // undefined -> ten dekorator wykonuje przed utworzeniem obiektu (!)
//         // console.log("this:", this) // Object { przedmiot: "Matematyka" }

//         let result = orginal.apply(this, args);

//         switch (this.type) {
//             case PathfinderMessageTypes.PATHFIND:
//                 if (
//                     this.walker != undefined
//                     || this.start == undefined
//                     || this.finish == undefined) {
//                     throw new InvalidPathfinderMessage()
//                 }
//                 break
//         }
//         return result;
//     }

//     return newConstructor;
// }

// export const toJSON = function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
//     let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
//     existingRequiredParameters.push(parameterIndex);
//     Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
//   }

// export const PathfinderMessageType = function (target: Function, key: string) {
//     let value = this[key];

//     const getter = () => {
//         return value;
//     }

//     const setter = (newValue) => {
//         // console.log('set ', value, newValue);
//         for (let type in PathfinderMessageTypes) {
//             if (type == newValue) {
//                 value = newValue
//                 return
//             }
//         }
//         throw new InvalidPathfinderType()
//     }

//     if (delete this[key]) {
//         Object.defineProperty(target, key, {
//             get: getter,
//             set: setter,
//             enumerable: true,
//             configurable: true
//         })
//     }
// }

// export const notNull = function (target: Object, propertyKey: string | symbol, parameterIndex: number) {
//     let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
//     existingRequiredParameters.push(parameterIndex);
//     Reflect.defineMetadata( requiredMetadataKey, existingRequiredParameters, target, propertyKey);
//   }

export const { } = { xd: "" }

class Exception extends Error {
    constructor(message: string) {
        super(message)
    }
}

class InvalidArgumentsException extends Exception {
    constructor(message: string) {
        super(message || "Invalid arguments")
    }
}

class InvalidPathfinderType extends InvalidArgumentsException {
    constructor() {
        super("Invalid value for Pathfinder.type")
    }
}