/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/Ball.ts":
/*!********************!*\
  !*** ./ts/Ball.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ball)\n/* harmony export */ });\nclass Ball {\n    constructor() {\n    }\n}\nBall.YELLOW = 1;\n\n\n//# sourceURL=webpack://kulki-2/./ts/Ball.ts?");

/***/ }),

/***/ "./ts/Board.ts":
/*!*********************!*\
  !*** ./ts/Board.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Board)\n/* harmony export */ });\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"./ts/Field.ts\");\n\nclass Board {\n    constructor(w, h) {\n        this.fields = [];\n        /**\n         * Checks if such a {@link Field~Field} exists on the {@link Board~Board}\n         * @param x X coordinate of {@link Field~Field}.\n         * @param y Y coordinate of {@link Field~Field}.\n         * @returns True if a {@link Field~Field} with such coordinates exists.\n         */\n        this.doesFieldExist = (x, y) => {\n            return !(this.fields[x] == null || this.fields[x] == undefined || this.fields[x][y] == null || this.fields[x][y] == undefined);\n        };\n        this.getHeight = () => {\n            return this.fields[0].length;\n        };\n        this.getWidth = () => {\n            return this.fields.length;\n        };\n        /**\n         * Returns a {@link Field~Field} by specific coordinates.\n         * @param x X coordinate of {@link Field~Field}.\n         * @param y Y coordinate of {@link Field~Field}.\n         * @returns {@link Field~Field} if it exists, otherwise null.\n         */\n        this.getField = (x, y) => {\n            if (!this.doesFieldExist(x, y))\n                return null;\n            return this.fields[x][y];\n        };\n        /**\n         * Returns a list of {@link Field~Field | Fields} which {@link Board~Board} contains.\n         * @returns Copy of two-dimensional array of {@link Field~Field | Fields}.\n         */\n        this.getFields = () => {\n            return [...this.fields].map((e) => { return [...e]; });\n        };\n        this.fields = [...new Array(w)].map((e, x) => { return [...new Array(h)].map((e, y) => { return new _Field__WEBPACK_IMPORTED_MODULE_0__[\"default\"](x, y); }); });\n    }\n}\n//można by zastosować DEKORATOR @notNull czy coś\n/**\n * Generates {@link Board~Board} instance from JSON data.\n * @param o JSON object which is going to be parsed.\n * @returns {@link Board~Board} object parsed from JSON data.\n */\nBoard.fromJSON = (o) => {\n    if (o == null || o == undefined)\n        throw new Error(\"Board cannot be parsed from null.\");\n    let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {\n        if (key == \"fields\") {\n            return [key, [...value].map((column) => { return [...column].map((field) => { return Object.assign(new _Field__WEBPACK_IMPORTED_MODULE_0__[\"default\"](0, 0), field); }); })];\n        }\n        else if (key == \"finish\") {\n            return [key, _Field__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fromJSON(value)];\n        }\n        return [key, value];\n    }));\n    return Object.assign(new Board(0, 0), result);\n};\n\n\n//# sourceURL=webpack://kulki-2/./ts/Board.ts?");

/***/ }),

/***/ "./ts/Field.ts":
/*!*********************!*\
  !*** ./ts/Field.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Field)\n/* harmony export */ });\n/* harmony import */ var _Ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ball */ \"./ts/Ball.ts\");\n\nclass Field {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    isLegal() {\n        return this._isLegal;\n    }\n    getX() {\n        return this.x;\n    }\n    getY() {\n        return this.y;\n    }\n}\n/**\n * Generates {@link Field~Field} instance from JSON data.\n * @param o JSON object which is going to be parsed.\n * @returns {@link Field~Field} object parsed from JSON data.\n */\nField.fromJSON = (o) => {\n    let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {\n        if (key == \"ball\") {\n            return [key, Object.assign(new _Ball__WEBPACK_IMPORTED_MODULE_0__[\"default\"](), value)];\n        }\n        return [key, value];\n    }));\n    return Object.assign(new Field(result.x, result.y), result);\n};\n\n\n//# sourceURL=webpack://kulki-2/./ts/Field.ts?");

/***/ }),

/***/ "./ts/Path.ts":
/*!********************!*\
  !*** ./ts/Path.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Path)\n/* harmony export */ });\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"./ts/Field.ts\");\n\n/**\n * Provides access to list of {@link Field~Field | Fields} in currently reaserched path to target.\n * Main aim is to manage permissions to data and actions performed on the object.\n * Used by {@link Walker~Walker} and {@link Pathfinder~Pathfinder}.\n */\nclass Path {\n    constructor() {\n        this.fields = [];\n        this.addField = (field) => {\n            this.fields.push(field);\n        };\n        this.getLastField = () => {\n            return this.fields[this.fields.length - 1];\n        };\n        this.getLength = () => {\n            return this.fields.length;\n        };\n    }\n}\n/**\n * Generates {@link Path~Path} instance from JSON data.\n * @param o JSON object which is going to be parsed.\n * @returns {@link Path~Path} object parsed from JSON data.\n */\nPath.fromJSON = (o) => {\n    let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {\n        if (key == \"fields\") {\n            return [key, value.map((field) => {\n                    return _Field__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fromJSON(field);\n                })];\n        }\n        return [key, value];\n    }));\n    return Object.assign(new Path(), result);\n};\n\n\n//# sourceURL=webpack://kulki-2/./ts/Path.ts?");

/***/ }),

/***/ "./ts/PathfinderMessage.ts":
/*!*********************************!*\
  !*** ./ts/PathfinderMessage.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PathfinderMessageTypes\": () => (/* binding */ PathfinderMessageTypes)\n/* harmony export */ });\n/**\n * Contains types of {@link PathfinderMessage}.\n */\nvar PathfinderMessageTypes;\n(function (PathfinderMessageTypes) {\n    /**\n     * {@link Pathfinder~Pathfinder} sends a request to {@link Walker~Walker} to start pathfinding.\n     * {@link PathfinderMessage~PathfinderMessage} with this type requires\n     * {@link PathfinderMessage~PathfinderMessage.start} and {@link PathfinderMessage~PathfinderMessage.finish}\n     */\n    PathfinderMessageTypes[PathfinderMessageTypes[\"PATHFIND\"] = 0] = \"PATHFIND\";\n    /**\n     * {@link Walker~Walker} emits an event, that he met a new {@link Field~Field}.\n     * {@link Pathfinder~Pathfinder} decides then, whether to maintain him or not.\n     */\n    PathfinderMessageTypes[PathfinderMessageTypes[\"FIELD_REACHED\"] = 1] = \"FIELD_REACHED\";\n    /**\n     * {@link Pathfinder~Pathfinder} sends request to {@link Walker~Walker} to continue pathfinding.\n     * Used after {@link Pathfinder~Pathfinder} gets {@link FIELD_REACHED} message and is interpreted by\n     * {@link Walker~Walker} as a permission to \"split\" (send {@link COWORKER_NEEDED} messages), if needed.\n     */\n    PathfinderMessageTypes[PathfinderMessageTypes[\"CONTINUE_PATHFINDING\"] = 2] = \"CONTINUE_PATHFINDING\";\n    /**\n     * {@link Walker~Walker} emits an event, that he needs to \"split\", to go in few directions.\n     * {@link Pathfinder~Pathfinder} receives then the new {@link Walker~Walker} object with a new\n     * {@link Field~Field} added to {@link Path~Path}\n     */\n    PathfinderMessageTypes[PathfinderMessageTypes[\"COWORKER_NEEDED\"] = 3] = \"COWORKER_NEEDED\";\n    /**\n     * {@link Pathfinder~Pathfinder} sens a request to {@link Walker~Walker} to continue pathfinding with some initial data.\n     * Used when {@link Pathfinder~Pathfinder} receives {@link COWORKER_NEEDED} message.\n     */\n    PathfinderMessageTypes[PathfinderMessageTypes[\"CONTINUE_PATHFINDING_BY_DATA\"] = 4] = \"CONTINUE_PATHFINDING_BY_DATA\";\n})(PathfinderMessageTypes || (PathfinderMessageTypes = {}));\n\n\n//# sourceURL=webpack://kulki-2/./ts/PathfinderMessage.ts?");

/***/ }),

/***/ "./ts/Walker.ts":
/*!**********************!*\
  !*** ./ts/Walker.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Walker)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./ts/Board.ts\");\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field */ \"./ts/Field.ts\");\n/* harmony import */ var _Path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Path */ \"./ts/Path.ts\");\n\n\n\nclass Walker {\n    constructor() {\n        /**\n         * Emited when Walker reaches new {@link Field~Field}. Used by {@link Pathfinder~Pathfinder} to decide, if the Walker should be maintained.\n         * @event\n         * @param walker {@link Walker~Walker}, who reached the {@link Field~Field}.\n         */\n        this.onFieldReached = (walker) => { };\n        /**\n         * Emited when {@link Walker~Walker} needs to \"split\" into few directions.\n         * @event\n         * @param walker New generated {@link Walker~Walker}\n         */\n        this.onCoworkerNeeded = (walker) => { };\n        /**\n         * Emited when {@link Walker~Walker} reaches the finish.\n         * @event\n         * @param walker {@link Walker~Walker} object which reached the finish.\n         */\n        this.onFinishReached = (walker) => { };\n        /**\n         * Method starts work of {@link Walker~Walker} to find {@link Path~Path}.\n         * @param start Start {@link Field~Field} for researched {@link Path~Path}.\n         * @param finish {@link Field~Field} where the {@link Path~Path} should lead to.\n         * @remarks Emits {@link onFieldReached:function} when reached new {@link Field~Field}.\n         */\n        this.findPath = (board, start, finish) => {\n            this.board = board;\n            this.path.addField(start);\n            this.finish = finish;\n            this.continuePathfinding();\n        };\n        /**\n         * Handles {@link PathfinderMessage~PathfinderMessageTypes.CONTINUE_PATHFINDING} message.\n         * Sends request to create new {@link worker | workers} and takes the first possible option (there is always\n         * at least one).\n         * @remarks Emits {@link onCoworkerNeeded:function} and {@link onFieldReached:function} events.\n         */\n        this.continuePathfinding = () => {\n            let possible = this.getPossibleDirectionsArray();\n            for (let i = 1; i < possible.length; i++) {\n                let coworker = this.duplicate();\n                coworker.getPath().addField(possible[i]);\n                this.onCoworkerNeeded(coworker);\n            }\n            this.path.addField(possible[0]);\n            this.onFieldReached(this);\n        };\n        /**\n         * Finds {@link Path~Path} starting with some initial data (method assumes that the {@link Walker~Walker}\n         * does not pathfind from the beginng of a {@link Path~Path}, because received {@link Walker~Walker} has some\n         * non-empty {@link Path~Path}).\n         * Used when {@link Walker~Walker} meets crossroads and needs to \"split\".\n         * @param walker Walker object containing initial data to pathfind.\n         * @remarks Emits {@link onFieldReached:function} event just after recieivng data ({@link Pathfinder~Pathfinder} needs\n         * to check, if his existence makes sense).\n         */\n        this.continuePathByData = (walker) => {\n            this.board = walker.board;\n            this.path = walker.getPath();\n            this.finish = walker.getFinish();\n            this.continuePathfinding();\n        };\n        /**@getter */\n        this.getPath = () => {\n            return this.path;\n        };\n        this.getFinish = () => {\n            return this.finish;\n        };\n        /**\n         * @public\n         * @returns List of {@link Field~Field | Fields} where the {@link Walker~Walker} can go.\n         * @remarks Used after receiving {@link PathfinderMessage~PathfinderMessageTypes.CONTINUE_PATHFINDING} message.\n         */\n        this.getPossibleDirectionsArray = () => {\n            let lastField = this.path.getLastField();\n            // console.log(\"this.path.getLastField(): \", this.path.getLastField());\n            let result = [];\n            if (this.board.doesFieldExist(lastField.getX() - 1, lastField.getY())) {\n                result.push(this.board.getField(lastField.getX() - 1, lastField.getY()));\n            }\n            if (this.board.doesFieldExist(lastField.getX(), lastField.getY() + 1)) {\n                result.push(this.board.getField(lastField.getX(), lastField.getY() + 1));\n            }\n            if (this.board.doesFieldExist(lastField.getX() + 1, lastField.getY())) {\n                result.push(this.board.getField(lastField.getX() + 1, lastField.getY()));\n            }\n            if (this.board.doesFieldExist(lastField.getX(), lastField.getY() - 1)) {\n                result.push(this.board.getField(lastField.getX(), lastField.getY() - 1));\n            }\n            return result;\n        };\n        /**\n         * Checks, if {@link Walker~Walker} has reached the target.\n         * @public\n         * @deprecated Everything which could be done be the function is performed by\n         * {@link Pathfinder~Pathfinder.walkerDidReachedFinish:function} inside {@link Pathfinder~Pathfinder}.\n         * @returns True if {@link Walker~Walker} has reached the {@link finish:member} {@link Field~Field},\n         * otherwise false.\n         */\n        this.isThisTheEnd = () => {\n            return this.path.getLastField().getX() == this.finish.getX()\n                && this.path.getLastField().getY() == this.finish.getY();\n        };\n        // toJSON = () => {\n        //     let result = Object.fromEntries(Object.entries(this).filter(([key, value]) => { return !(value instanceof Function) }))\n        //     result = Object.fromEntries(Object.entries(this).map(([key, value]) => {\n        //         if (value.toJSON != undefined)\n        //             return [key, value.toJSON()]\n        //         return [key, value]\n        //     }))\n        //     return result\n        // }\n        /**\n         * Creates a copy of the {@link Walker~Walker}.\n         * @returns Copied {@link Walker~Walker}.\n         * @remarks This should not be performed by a spread (\\{... \\}) operator, because then the child objects (e.g.\n         * {@link Path~Path}) would be copied by reference.\n         */\n        this.duplicate = () => {\n            return Walker.fromJSON(JSON.parse(JSON.stringify(this)));\n        };\n        this.path = new _Path__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n    }\n}\n/**\n * Generates {@link Walker~Walker} instance from JSON data.\n * @param o JSON object which is going to be parsed.\n * @returns {@link Walker~Walker} object parsed from JSON data.\n */\nWalker.fromJSON = (o) => {\n    let result = Object.fromEntries(Object.entries(o).map(([key, value]) => {\n        if (key == \"path\") {\n            return [key, _Path__WEBPACK_IMPORTED_MODULE_2__[\"default\"].fromJSON(value)];\n        }\n        else if (key == \"finish\") {\n            return [key, _Field__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fromJSON(value)];\n        }\n        else if (key == \"board\") {\n            return [key, _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fromJSON(value)];\n        }\n        return [key, value];\n    }));\n    return Object.assign(new Walker(), result);\n};\n\n\n//# sourceURL=webpack://kulki-2/./ts/Walker.ts?");

/***/ }),

/***/ "./ts/worker.ts":
/*!**********************!*\
  !*** ./ts/worker.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./ts/Board.ts\");\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field */ \"./ts/Field.ts\");\n/* harmony import */ var _PathfinderMessage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PathfinderMessage */ \"./ts/PathfinderMessage.ts\");\n/* harmony import */ var _Walker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Walker */ \"./ts/Walker.ts\");\n/**\n * Script, which is invoked by {@link Pathfinder~Pathfinder} on a new thread, to calculate possible routes.\n * The script itself, creates a new {@link Walker~Walker} and provides communication between\n * {@link Pathfinder~Pathfinder}(who is on the main thread) and {@link Walker~Walker}(who is on the worker's thread)\n *  by passing {@link PathfinderMessage~PathfinderMessage}.\n * @packageDocumentation\n */\n\n\n\n\nlet walker = new _Walker__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\n// listeners on Walker (child)\nwalker.onFieldReached = (walker) => {\n    self.postMessage(JSON.parse(JSON.stringify({\n        type: _PathfinderMessage__WEBPACK_IMPORTED_MODULE_2__.PathfinderMessageTypes.FIELD_REACHED,\n        walker: walker\n    })));\n};\nwalker.onCoworkerNeeded = (walker) => {\n    self.postMessage(JSON.parse(JSON.stringify({\n        type: _PathfinderMessage__WEBPACK_IMPORTED_MODULE_2__.PathfinderMessageTypes.COWORKER_NEEDED,\n        walker: walker\n    })));\n};\n// listeners on self (on events emited by {@link Pathfinder~Pathfinder} who is de facto parent)\nonmessage = (message) => {\n    let m = message.data;\n    // console.log(\"received message from Pathfinder: \", m);\n    //console.log(\"self: \", self);\n    switch (m.type) {\n        case _PathfinderMessage__WEBPACK_IMPORTED_MODULE_2__.PathfinderMessageTypes.PATHFIND:\n            console.log(m.board);\n            walker.findPath(_Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fromJSON(m.board), _Field__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fromJSON(m.start), _Field__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fromJSON(m.finish));\n            break;\n        case _PathfinderMessage__WEBPACK_IMPORTED_MODULE_2__.PathfinderMessageTypes.CONTINUE_PATHFINDING:\n            walker.continuePathfinding();\n            break;\n        case _PathfinderMessage__WEBPACK_IMPORTED_MODULE_2__.PathfinderMessageTypes.CONTINUE_PATHFINDING_BY_DATA:\n            walker.continuePathByData(_Walker__WEBPACK_IMPORTED_MODULE_3__[\"default\"].fromJSON(m.walker));\n            break;\n        default:\n            console.log(\"message: \", m);\n            console.error(\"Unkown type of Pathfinder message.\");\n    }\n};\n\n\n//# sourceURL=webpack://kulki-2/./ts/worker.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ts/worker.ts");
/******/ 	
/******/ })()
;