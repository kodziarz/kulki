import { COLORS } from "./Ball";
import { PathfinderMessageTypes } from "./PathfinderMessage";

/** @hidden Checks, wheather Class property value belongs to {@link Ball.COLORS} enum. */
// export function Color(target: any, propertyKey: string): any {

//     Object.defineProperty(target, propertyKey, {
//         get: function () {
//             return this["_" + propertyKey]
//         },
//         set: function (value: number) {
//             if (!(value in COLORS))
//                 throw new Error("Wrong color value. Passed color value should belong to COLORS enum.")
//             this["_" + propertyKey] = value
//             console.log("target: ", target);

//         }
//     })
// }

// export function PathfinderMessageType(target: any, propertyKey: string): any {
//     Object.defineProperty(target, propertyKey, {
//         get: function () {
//             return this["_" + propertyKey]
//         },
//         set: function (value: number) {
//             if (!(value in PathfinderMessageTypes))
//                 throw new Error("Wrong PathfinderMessageType value. Passed color value should belong to PathfinderMessageTypes enum.")
//             this["_" + propertyKey] = value
//             console.log("target: ", target);

//         }
//     })
// }

/**
 *  Restricts property to accept only values listed in given number Enum.
 * @param enumerator Enumerator which values the property sholud accept.
 * @remarks It is a property decorator.
 */
export function Enumerated(enumerator: any) {
    return function PathfinderMessageType(target: any, propertyKey: string): any {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this["_" + propertyKey]
            },
            set: function (value: number) {
                if (!(value in enumerator))
                    throw new Error("Wrong field \"" + propertyKey + "\" value. Passed value should belong to enum:\n" + JSON.stringify(enumerator, null, 5))
                this["_" + propertyKey] = value
            }
        })
    }
}

const notNullPrefix = "__metadata_"

/**Modifies a decorated method, to respect {@link NotNull:function | @NotNull} decoration. */
export function ValidateNotNull(target: Object, methodName: string, descriptor: PropertyDescriptor) {

    let original = descriptor.value

    let meta: any = Object.getOwnPropertyDescriptor(target, notNullPrefix + methodName)?.value

    if (meta != undefined)
        descriptor.value = function (...args: any[]) {
            for (let i of meta)
                if (args[i] == null)
                    throw new Error("Parameter number " + i + " was passed null, altough it is annotated with @NotNull decorator.")
            return original.apply(this, args)
        }
}

/**
 * Restricts decorated parameter not to be null. To work needs the method, where the parameter is, to be
 * decorated with {@link ValidateNotNull:function | @ValidateNotNull} decorator.
 */
export function NotNull(target: any, methodName: string, paramIndex: number): any {
    //console.log("function: ", target[methodName].toString());

    let currentMeta: any = Object.getOwnPropertyDescriptor(target, notNullPrefix + methodName)?.value
    if (currentMeta instanceof Array) {
        Object.defineProperty(target, notNullPrefix + methodName, {
            value: [...currentMeta, paramIndex]
        })
    } else {
        Object.defineProperty(target, notNullPrefix + methodName, {
            value: [paramIndex]
        })
    }
}