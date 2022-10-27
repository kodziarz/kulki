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

/***/ "./ts/Field.ts":
/*!*********************!*\
  !*** ./ts/Field.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Field)\n/* harmony export */ });\nclass Field {\n    constructor(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n    isLegal() {\n        return this._isLegal;\n    }\n    getX() {\n        return this.x;\n    }\n    getY() {\n        return this.y;\n    }\n}\n\n\n//# sourceURL=webpack://kulki-2/./ts/Field.ts?");

/***/ }),

/***/ "./ts/Walker.ts":
/*!**********************!*\
  !*** ./ts/Walker.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Walker)\n/* harmony export */ });\n/* harmony import */ var _walkerEvents_FieldReachedEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./walkerEvents/FieldReachedEvent */ \"./ts/walkerEvents/FieldReachedEvent.ts\");\n\nclass Walker extends EventTarget {\n    constructor(root) {\n        super();\n        this.findPath = (start, finish) => {\n            this.path.addField(start);\n            this.dispatchEvent(new _walkerEvents_FieldReachedEvent__WEBPACK_IMPORTED_MODULE_0__[\"default\"](start, this.path));\n            // this.worker.postMessage({\n            //     message: Walker.MESSAGES.PATHFIND,\n            //     start: start,\n            //     finish: finish\n            // })\n        };\n        this.worker = root;\n    }\n}\nWalker.MESSAGES = {\n    PATHFIND: 0\n};\n\n\n//# sourceURL=webpack://kulki-2/./ts/Walker.ts?");

/***/ }),

/***/ "./ts/walkerEvents/FieldReachedEvent.ts":
/*!**********************************************!*\
  !*** ./ts/walkerEvents/FieldReachedEvent.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FieldReachedEvent)\n/* harmony export */ });\nclass FieldReachedEvent extends CustomEvent {\n    constructor(field, currentPath) {\n        super(\"onFieldReachedEvent\", null);\n        this.field = field;\n        this.currentPath = currentPath;\n    }\n}\n\n\n//# sourceURL=webpack://kulki-2/./ts/walkerEvents/FieldReachedEvent.ts?");

/***/ }),

/***/ "./ts/worker.ts":
/*!**********************!*\
  !*** ./ts/worker.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Field */ \"./ts/Field.ts\");\n/* harmony import */ var _Walker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Walker */ \"./ts/Walker.ts\");\n\n\n// import scripts\nlet walker = new _Walker__WEBPACK_IMPORTED_MODULE_1__[\"default\"](undefined);\nonmessage = (e) => {\n    console.log(e.data);\n    console.log(\"self: \", self);\n    if (e.message == undefined)\n        return null;\n    switch (e.message) {\n        case _Walker__WEBPACK_IMPORTED_MODULE_1__[\"default\"].MESSAGES.PATHFIND:\n            if (!(e.start instanceof _Field__WEBPACK_IMPORTED_MODULE_0__[\"default\"] && e.start instanceof _Field__WEBPACK_IMPORTED_MODULE_0__[\"default\"]))\n                return null;\n            //walker.findPath()\n            break;\n    }\n};\n\n\n//# sourceURL=webpack://kulki-2/./ts/worker.ts?");

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