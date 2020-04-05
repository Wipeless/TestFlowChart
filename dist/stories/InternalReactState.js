"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var src_1 = require("../src");
var components_1 = require("./components");
var exampleChartState_1 = require("./misc/exampleChartState");
exports.InternalReactState = function () {
    return (React.createElement(components_1.Page, null,
        React.createElement(src_1.FlowChartWithState, { initialValue: exampleChartState_1.chartSimple })));
};
//# sourceMappingURL=InternalReactState.js.map